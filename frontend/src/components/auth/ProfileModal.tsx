// Settings modal for user profile

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfilePicture from './ProfilePicture';
import { updateProfile, updateAvatar, retrieveAvatar } from '../../api/auth';
import Loading from '../Loading';

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { authState, signOut, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState(authState?.user?.name || '');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>(authState?.user?.avatar || 'avatar.png');

    // Fetch the user's avatar when the component mounts, selecting the default avatar if none is found
    useEffect(() => {
        const fetchAvatar = async () => {
            if (authState?.user?.id) {
                try {
                    const avatarUrl = await retrieveAvatar(authState.user.id);
                    if (avatarUrl === null) {
                        setAvatarUrl('avatar.png');
                    } else {
                        setAvatarUrl(avatarUrl);
                        updateUser({ avatar: avatarUrl });
                    }
                } catch (error) {
                    console.error("Error retrieving avatar:", error);
                }
            }
        };
        fetchAvatar();
    }, [authState?.user?.id, updateUser]);

    // Update the name state when the input changes
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    // Update the avatar state when a new file is selected
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);

            // Update the authState with the new avatar URL for instant feedback
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Handle profile update
    const handleSave = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            // If a new avatar is provided, upload it first
            if (avatar) {
                const uploadData = await updateAvatar(authState?.user?.id || '', avatar);
                setAvatarUrl(uploadData.path);
                updateUser({ avatar: uploadData.path });

                // Update the database table with the new avatar URL
                await updateProfile(authState?.user?.id || '', name, uploadData.path);
            } else {
                // Update the database table without changing the avatar URL
                await updateProfile(authState?.user?.id || '', name, avatarUrl);
            }

            // Update local auth state
            updateUser({ name, avatar: avatar ? avatarUrl : authState?.user?.avatar });

            onClose();
        } catch (error) {
            setErrorMessage("Error updating profile information.");
            console.error("Error updating profile information:", error);
        } finally {
            setLoading(false);
        }
    };

    // Log out the user and close the modal
    const handleLogout = () => {
        try {
            signOut();
            onClose();
        } catch (error) {
            setErrorMessage("Error logging out.");
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="auth-modal" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Profile</h2>
                <label className="auth-label">
                    Email:
                    <input
                        className="auth-input"
                        type="text"
                        name="email"
                        value={authState?.user?.email || ''}
                        disabled
                    />
                </label>
                <label className="auth-label">
                    Name:
                    <input
                        className="auth-input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </label>
                <label className="auth-label">
                    Avatar:
                    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <ProfilePicture avatarUrl={avatarUrl || "avatar.png"} size={100} />
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                            }}
                            onChange={handleAvatarChange}
                        />
                    </div>
                </label>
                {loading && <Loading />}
                {errorMessage && <p className="auth-error">{errorMessage}</p>}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className="auth-button auth-button-red" onClick={handleLogout}>
                        Log Out
                    </button>
                    <button className="auth-button auth-button-green" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;

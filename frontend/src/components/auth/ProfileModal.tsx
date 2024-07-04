// Settings modal for user profile

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfilePicture from './ProfilePicture';

interface ProfileModalProps {
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
    const { authState, signOut } = useAuth();
    const [name, setName] = useState(authState?.user?.name || '');
    const [avatar, setAvatar] = useState<File | null>(null);

    // Update the name state when the input changes
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    // Update the avatar state when a new file is selected
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            
            // Update the authState with the new avatar URL for instant feedback
            const newAvatarUrl = URL.createObjectURL(e.target.files[0]);
            if (authState?.user) {
                authState.user.avatar = newAvatarUrl;
            }
        }
    };

    // Log out the user and close the modal
    const handleLogout = () => {
        signOut();
        onClose();
    };

    return (
        <div className="auth-modal" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Profile</h2>
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
                        <ProfilePicture avatarUrl={authState?.user?.avatar || "avatar.png"} size={100} />
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="auth-button auth-button-red" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;

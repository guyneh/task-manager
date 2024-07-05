// Displays a profile picture with a given size and avatar URL

import React from 'react';

interface ProfilePictureProps {
    avatarUrl: string;
    size?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ avatarUrl, size = 60 }) => {
    return (
        <img
            src={avatarUrl || "avatar.png"}
            alt="Profile"
            className="profile-picture"
            style={{
                width: size,
                height: size,
            }}
        />
    );
};

export default ProfilePicture;

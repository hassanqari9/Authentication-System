import React, { useState } from 'react';
import Logout from './Logout';
import useFetchData from '../hooks/useFetchData';

const Profile = () => {
    const {data:profile, error} = useFetchData()

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            {/* Add more profile fields here if needed */}
            <Logout />
        </div>
    );
};

export default Profile;

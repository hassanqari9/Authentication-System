// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';  // Use the Axios instance with interceptors
import Logout from './Logout';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/api/user/me');
                setProfile(response.data.user);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Error fetching profile data.');
            }
        };

        fetchProfile();
    }, []);

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

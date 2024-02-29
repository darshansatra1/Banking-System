import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [editableFields, setEditableFields] = useState({
        username: false,
        email: false,
        balance: false
    });

    // Fetch user data from the backend API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user'); // Replace '/api/user' with your actual API endpoint
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    // Enable editing for the specified field
    const enableEdit = (field) => {
        setEditableFields({ ...editableFields, [field]: true });
    };

    // Disable editing for the specified field
    const disableEdit = (field) => {
        setEditableFields({ ...editableFields, [field]: false });
        // Implement code to save changes to the backend API
    };

    // Update user data locally when editing
    const handleFieldChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                    {userData && (
                        <div>
                            <p><strong>User Name:</strong> {editableFields.username ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleFieldChange}
                                    onBlur={() => disableEdit('username')}
                                />
                            ) : (
                                <span onClick={() => enableEdit('username')}>{userData.username}</span>
                            )}</p>
                            <p><strong>Account Id:</strong> {userData.accountId}</p>
                            <p><strong>Email:</strong> {editableFields.email ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleFieldChange}
                                    onBlur={() => disableEdit('email')}
                                />
                            ) : (
                                <span onClick={() => enableEdit('email')}>{userData.email}</span>
                            )}</p>
                            <p><strong>Balance:</strong> {editableFields.balance ? (
                                <input
                                    type="text"
                                    name="balance"
                                    value={userData.balance}
                                    onChange={handleFieldChange}
                                    onBlur={() => disableEdit('balance')}
                                />
                            ) : (
                                <span onClick={() => enableEdit('balance')}>{userData.balance}</span>
                            )}</p>
                            <p><strong>Supervisor Name:</strong> {userData.supervisorName}</p>
                        </div>
                    )}
                    <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={() => disableEdit('')}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
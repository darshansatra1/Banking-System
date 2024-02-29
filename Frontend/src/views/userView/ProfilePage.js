import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import Cookies from 'js-cookie';

const ProfilePage = ({ role }) => {
    const [userData, setUserData] = useState(null);
    const [editableFields, setEditableFields] = useState({
        user_name: false,
        _uid : false,
=======

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [editableFields, setEditableFields] = useState({
        username: false,
>>>>>>> e2e0c4c (added profile page and Deposit page)
        email: false,
        balance: false
    });

<<<<<<< HEAD
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token'); // Get token from cookie
                if (token) {
                    const response = await axios.get("http://localhost:8080/customer/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data);
                    console.log("User data:", response.data);
                } else {
                    console.error("Token not found in cookie");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
=======
    // Fetch user data from the backend API
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user'); // Replace '/api/user' with your actual API endpoint
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
>>>>>>> e2e0c4c (added profile page and Deposit page)
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
<<<<<<< HEAD
                            <p><strong>User Name:</strong> {editableFields.user_name ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.user_name}
=======
                            <p><strong>User Name:</strong> {editableFields.username ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
>>>>>>> e2e0c4c (added profile page and Deposit page)
                                    onChange={handleFieldChange}
                                    onBlur={() => disableEdit('username')}
                                />
                            ) : (
<<<<<<< HEAD
                                <span onClick={() => enableEdit('username')}>{userData.user_name}</span>
                            )}</p>
                            <p><strong>Account Id:</strong> {userData._uid}</p>
=======
                                <span onClick={() => enableEdit('username')}>{userData.username}</span>
                            )}</p>
                            <p><strong>Account Id:</strong> {userData.accountId}</p>
>>>>>>> e2e0c4c (added profile page and Deposit page)
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

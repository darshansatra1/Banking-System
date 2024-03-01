import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState([]);
    const navigate = useNavigate(); 
  
    const [editableFields, setEditableFields] = useState({
        user_name: false,
        _uid : false,
        email: false,
        balance: false
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const role = Cookies.get('role');
                if (!role) {
                  console.error("Role not found in cookie");
                  navigate("/login");
                  return;
                }
                setRole(role);
                const token = Cookies.get('token');
                if (token) {
                  const response = await axios.get('http://localhost:8080/'+ role +'/profile', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  setUserData(response.data);
                  console.log("User data:", response.data);
                } else {
                  console.error("Token not found in cookie");
                  navigate("/login");          
                }
              } catch (error) {
                console.error("Error fetching user data:", error);
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
                            <p><strong>User Name:</strong> {editableFields.user_name ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.user_name}
                                    onChange={handleFieldChange}
                                    onBlur={() => disableEdit('username')}
                                />
                            ) : (
                                <span onClick={() => enableEdit('username')}>{userData.user_name}</span>
                            )}</p>
                            <p><strong>Account Id:</strong> {userData._uid}</p>
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
                            <p><strong>Supervisor Name:</strong> {userData.supervisor}</p>
                        </div>
                    )}
                   
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;

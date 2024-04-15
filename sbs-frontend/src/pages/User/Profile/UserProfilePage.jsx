import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../hooks/useAuth";

import UserProfilePageEdit from './UserProfilePageEdit';

const UserProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useAuth();
    const [role, setRole] = useState(null); // Define role state
    const navigate = useNavigate(); 
  
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user.role) {
                  navigate("/login");
                  return;
                }
                
                if (user.token) {
                  const response = await axios.get('https://156.56.103.231:8080/'+ user.role +'/profile', {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  });  
                  setUserData(response.data);
                } else {
                  navigate("/login");          
                }
              } catch (error) {
                console.error("Error fetching user data:", error);
              }
            };
        fetchUserData();
        }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (updatedUserData) => {
        // Send updated user data to the backend
        try {
            if (user.token) {
                const response = await axios.put('https://156.56.103.231:8080/'+ user.role +'/profile', updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                // Update local state with new user data
                setUserData(updatedUserData);
                setIsEditing(false); 
            } else {
                console.error("Token not found in user object");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    
    const handleCancel = () => {
        setIsEditing(false);
    };



    const extractDate = (datetimeString) => {
        if (!datetimeString) return null; // handle null or undefined datetimeString
        
        const date = new Date(datetimeString);
        
        if (isNaN(date.getTime())) {
            console.error("Invalid date string:", datetimeString);
            return null;
        }
        
        // Get the date part in yyyy-mm-dd format
        return date.toISOString().split('T')[0];
    };
    
    const formattedDate = userData ? extractDate(userData.dob) : null;

    return (
        <div className="container mx-auto py-8">
            {userData && (  // Add this condition to ensure userData is not null before rendering
                isEditing ? (
                    <UserProfilePageEdit 
                        userData={userData} 
                        onSave={handleSave} 
                        onCancel={handleCancel} 
                        date={formattedDate}
                    />
                ) : (
                    <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                        <div className="p-6">
                            <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                                <span>User Profile</span>
                            </h3>
                            <div>
                                <p className='text-slate-100'><strong>User Name:</strong> {userData.user_name}</p>
                                <p className='text-slate-100'><strong>Email:</strong> {userData.email}</p>
                                {formattedDate && <p className='text-slate-100'><strong>Date of Birth:</strong>{formattedDate}</p>}
                                <p className='text-slate-100'><strong>Mobile Number:</strong> {userData.phone_number}</p>
                                <p className='text-slate-100'><strong>Address:</strong> {userData.address}</p>
                                <p className='text-slate-100'><strong>Balance:</strong> {userData.balance}</p>
                                <p className='text-slate-100'><strong>Supervisor Name:</strong> {userData.supervisor}</p>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEdit}>Update Profile</button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
    
};

export default UserProfilePage;

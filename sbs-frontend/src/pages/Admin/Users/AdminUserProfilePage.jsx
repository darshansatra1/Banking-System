import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import { AdminUserProfileEditPage } from './AdminUserProfileEditPage';

export const AdminUserProfilePage = () => {
    const { userId, userRole } = useParams();
    console.log("userRole in profile page is ", userRole);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
      setLoading(true);
      setErrorMessage(''); 
      // Check if token exists
        if (user.token) {
          // Make API request to fetch withdrawal history
          axios.get(`http://localhost:8080/${user.role}/user/${userId}?role=${userRole}`, {
              headers: {
                  Authorization: `Bearer ${user.token}`, // Include token in the headers
              },
          })
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => { 
              setErrorMessage('An error occurred while fetching user profile. Please try again later.');
          })
          .finally(() => {
              setLoading(false);
          });
        } else { 
          setLoading(false);
        }
    }, [user.role]); // Add 'role' to the dependency array

    const handleEditUser = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDeleteUser = async () => {
        try {
        setLoading(true);
        setErrorMessage(''); 
    
        if (!user.role || !user.token) {
            navigate("/login");
            return;
        }
        //userId
        // const response = await axios.post(
        //     'http://localhost:8080/'+user.role+'/deposit/'+ depositId,
        //     { accept },
        //     {
        //     headers: {
        //         Authorization: `Bearer ${user.token}`,
        //     },
        //     }
        // ); 
          navigate('/admin/users');
        } catch (error) {
        window.alert(error.message, () => {
            window.location.reload(); // Reload the page on OK
        });
        } finally {
        setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    const handleSave = async (updatedUserData) => {
        // Send updated user data to the backend
        try {
            if (user.token) {
                await axios.put(`http://localhost:8080/${user.role}/user/${userId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Include token in the headers
                    },
                });

                console.log()
                // Update local state with new user data
                setUserData(updatedUserData);
                setIsEditing(false);
                console.log("Profile updated successfully!");
            } else {
                console.error("Token not found in cookie");
                navigate("/login");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="container mx-auto py-8">
             {isEditing ? (
                <AdminUserProfileEditPage 
                    userData={userData} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            ) : (
            <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                <div className="p-6">
                    <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                        <span>User Profile</span>
                    </h3>
                    {loading ? (
                          <p className="text-gray-100">Loading deposit history...</p>
                      ) : errorMessage ? (
                          <p className="text-red-500">{errorMessage}</p>
                      ) : userData && userData.length === 0 ? (
                          <p className="text-gray-100">No deposit history available.</p>
                      ) : (
                          <ul>
                            {userData && (
                                <div>
                                    <p className='text-slate-100'><strong>User Name:</strong> {userData.user_name} </p>
                                    <p className='text-slate-100'><strong>Account Id:</strong> {userData._uid}</p>
                                    <p className='text-slate-100'><strong>Email:</strong> {userData.email} </p>
                                    <p className='text-slate-100'><strong>Balance:</strong> {userData.balance}</p>
                                    <p className='text-slate-100'><strong>Supervisor Name:</strong> {userData.supervisor}</p>
                                    <p className='text-slate-100'><strong>Phone number:</strong> {userData.phone_number}</p>
                                    <p className='text-slate-100'><strong>Address:</strong> {userData.address}</p>
                                    <div style={{ textAlign: 'right' }}>
                                        <button type="button" 
                                                data-te-ripple-init 
                                                data-te-ripple-color="light" 
                                                onClick={handleEditUser}
                                                className="mb-6 rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                style={{ marginRight: '50px' }}>
                                            Edit User
                                        </button>

                                        <button type="button" 
                                                data-te-ripple-init 
                                                data-te-ripple-color="light" 
                                                onClick={handleDeleteUser}
                                                className="mb-6 rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                            Delete User
                                        </button>
                                    </div>
                                </div>  
                            )}
                          </ul>
                      )}
                </div>
            </div>
            )}        
         </div>
    );
}

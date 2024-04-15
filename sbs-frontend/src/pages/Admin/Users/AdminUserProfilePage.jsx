import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import { AdminUserProfileEditPage } from './AdminUserProfileEditPage';

export const AdminUserProfilePage = () => {
    const { userId, userRole } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
      setLoading(true);
      setErrorMessage(''); 
      // Check if token exists
        if (user.token) {
          // Make API request to fetch user data
          axios.get(`https://156.56.103.231:8080/${user.role}/user/${userId}?role=${userRole}`, {
              headers: {
                  Authorization: `Bearer ${user.token}`, // Include token in the headers
              },
          })
          .then(response => {
            setUserData(response.data);
            setIsActive(response.data.status);
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

    const handleDeactivateUser = async () => {
        try {
        setLoading(true);
        setErrorMessage(''); 
    
        if (!user.role || !user.token) {
            navigate("/login");
            return;
        }

        const deactivatePayload = {};
        deactivatePayload.role = userData.role;
        deactivatePayload.status = false;
        
        await axios.put(`https://156.56.103.231:8080/${user.role}/user/${userId}/status`, deactivatePayload, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Include token in the headers
            },
        });
        setIsActive(false);
        } catch (error) {
        window.alert(error.message, () => {
            window.location.reload(); // Reload the page on OK
        });
        } finally {
        setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    const handleActivateUser = async () => {
        try {
            setLoading(true);
            setErrorMessage(''); 
        
            if (!user.role || !user.token) {
                navigate("/login");
                return;
            }
    
            const deactivatePayload = {};
            deactivatePayload.role = userData.role;
            deactivatePayload.status = true;
            
            await axios.put(`https://156.56.103.231:8080/${user.role}/user/${userId}/status`, deactivatePayload, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include token in the headers
                },
            });
            setIsActive(true);
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
                await axios.put(`https://156.56.103.231:8080/${user.role}/user/${userId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Include token in the headers
                    },
                }); 
                // Update local state with new user data
                setUserData(updatedUserData);
                setIsEditing(false); 
            } else { 
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
                          <p className="text-gray-100">Loading user profile...</p>
                      ) : errorMessage ? (
                          <p className="text-red-500">{errorMessage}</p>
                      ) : userData && userData.length === 0 ? (
                          <p className="text-gray-100">No user profile available.</p>
                      ) : (
                          <ul>
                            {userData && (
                                <div>
                                    <p className='text-slate-100'><strong>User Name:</strong> {userData.user_name} </p>
                                    <p className='text-slate-100'><strong>Account Id:</strong> {userData._uid}</p>
                                    <p className='text-slate-100'><strong>Email:</strong> {userData.email} </p>
                                   {userData.balance && ( <p className='text-slate-100'><strong>Balance:</strong> {userData.balance}</p> )}
                                   {userData.supervisor && ( <p className='text-slate-100'><strong>Supervisor Name:</strong> {userData.supervisor}</p> )}
                                    <p className='text-slate-100'><strong>Phone number:</strong> {userData.phone_number}</p>
                                    <p className='text-slate-100'><strong>Address:</strong> {userData.address}</p>
                                    <div style={{ textAlign: 'right' }}>
                                    { (isActive === true || (userData.role === "manager" || userData.role === "employee")) && ( <button type="button"
                                                data-te-ripple-init 
                                                data-te-ripple-color="light" 
                                                onClick={handleEditUser}
                                                className="mb-6 rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                style={{ marginRight: '50px' }}>
                                            Edit User
                                        </button>)}      
                                        {isActive === true ?
                                        (     
                                        <button type="button" 
                                        data-te-ripple-init 
                                        data-te-ripple-color="light" 
                                        onClick={handleDeactivateUser}
                                        className="mb-6 rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                    Deactivate User
                                </button>
                                ) : 
                                ( userData.role === "customer" && (
                                    <button type="button" 
                                            data-te-ripple-init 
                                            data-te-ripple-color="light" 
                                            onClick={handleActivateUser}
                                            className="mb-6 rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        Activate User
                                    </button>)) }
                                      
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

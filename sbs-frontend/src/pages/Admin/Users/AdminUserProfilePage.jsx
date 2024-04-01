import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../../hooks/useAuth";
import { useParams } from 'react-router-dom';

export const AdminUserProfilePage = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAuth();

    useEffect(() => {
      setLoading(true);
      setErrorMessage(''); 
      // Check if token exists
      if (user.token) {
          // Make API request to fetch withdrawal history
          axios.get(`http://localhost:8080/${user.role}/user/${userId}?role=customer`, {
              headers: {
                  Authorization: `Bearer ${user.token}`, // Include token in the headers
              },
          })
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => { 
              setErrorMessage('An error occurred while fetching user profile.');
          })
          .finally(() => {
              setLoading(false);
          });
      } else { 
          setLoading(false);
      }
  }, [user.role]); // Add 'role' to the dependency array

    return (
        <div className="container mx-auto py-8">
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
                                </div>
                            )}
                          </ul>
                      )}
                </div>
            </div>
        </div>
    );
}

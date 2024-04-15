import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../hooks/useAuth";

export const AdminProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const {user} = useAuth();
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
          <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
              <div className="p-6">
                  <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                      <span>User Profile</span>
                  </h3>
                  {userData && (
                  <div>
                      <p className='text-slate-100'><strong>User Name:</strong> {userData.user_name}</p>
                      <p className='text-slate-100'><strong>Email:</strong> {userData.email}</p>
                      {formattedDate && <p className='text-slate-100'><strong>Date of Birth:</strong>{formattedDate}</p>}
                      <p className='text-slate-100'><strong>Mobile Number:</strong> {userData.phone_number}</p>
                      <p className='text-slate-100'><strong>Address:</strong> {userData.address}</p>
                  </div>
                  )
                }
              </div>
          </div>
      </div>
  );
}

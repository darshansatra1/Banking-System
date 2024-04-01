import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import UserListCard from "../../../components/Admin/UserListCard";

export const AdminUserListPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        setLoading(true);
        setErrorMessage(''); 
        // Check if token exists
        if (user.token) {
            // Make API request to fetch deposit history
            axios.get(`http://localhost:8080/${user.role}/user`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include token in the headers
                },
            })
            .then(response => {
              setUserData(response.data);
            })
            .catch(error => {
                setErrorMessage('An error occurred while fetching user list.');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            console.error('Token not found in cookies');
            setLoading(false);
        }
    }, []);  

    const onClick = async (userId) => {
        navigate(`${userId}`);
    };    

    return (
      <div>
          <div className="container mx-auto py-8">
              <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                  <div className="p-6">

                      <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                          <span>User List</span>
                      </h3>
                      {loading ? (
                          <p className="text-gray-100">Loading user list...</p>
                      ) : errorMessage ? (
                          <p className="text-red-500">{errorMessage}</p>
                      ) : userData.length === 0 ? (
                          <p className="text-gray-100">No user list available.</p>
                      ) : (
                          <ul>
                              {userData && userData.map((user) => (
                                  <UserListCard
                                      user_name={user.user_name}
                                      email={user.email}
                                      balance={user.balance}
                                      account_id={user._id}
                                      role={user.role}
                                      supervisor={user.supervisor}
                                      manager={user.manager}
                                      user_id={user._id}
                                      onClick={onClick}
                                  />
                              ))}
                          </ul>
                      )}
                  </div>
              </div>
          </div>
      </div>
    );
}

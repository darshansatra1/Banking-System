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
                  const response = await axios.get('http://localhost:8080/'+ user.role +'/profile', {
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

    return (
        <div>AdminProfilePage</div>
    )
}

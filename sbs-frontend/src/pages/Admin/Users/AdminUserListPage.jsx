import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import UserListCard from "../../../components/Admin/UserListCard";

export const AdminUserListPage = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          try {
            if (!user.role) {
              navigate("/login");
              return;
            }
            
            if (user.token) {
              const response = await axios.get('http://localhost:8080/'+ user.role +'/user', {
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
        getUsers();
      }, []);

  return (
    <div>
        <div className="w-full max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
        <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
          <span> User List</span>
        </h3>
        {userData && userData.map((user) => (
            <UserListCard
                user_name={user.user_name}
                email={user.email}
                balance={user.balance}
                account_id={user._id}
                role={user.role}
                supervisor={user.supervisor}
                manager={user.manager}
            />
        ))}
      </div>
    </div>
  )
}

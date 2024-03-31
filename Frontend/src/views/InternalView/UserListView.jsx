import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserListCard from "../../components/shared/admin/UserListCard"; // Import the Cookies library


export default function UserListView() {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const getUsers = async () => {
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
          const response = await axios.get('http://localhost:8080/'+ role +'/user', {
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
    getUsers();
  }, []);

  return (
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
  );
}

import { FcCurrencyExchange } from "react-icons/fc";
import { Logo } from "../../components/shared/Logo";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the Cookies library


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
    <div className="w-full lg:w-[40%] max-w-md block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-blue-800 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 border-blue-800 select-none">
        <FcCurrencyExchange className="mr-1" size={45} />
        <span> User List</span>
      </h3>

      {userData && userData.map((user) => (
        <div>
          <p>
            Name: {user.user_name}
          </p>
          <p>
            Account Number: {user.client_id}
          </p>
          <p>
            Email: {user.email}
          </p>
          <p>
            Supervisor: {user.supervisor}
          </p>
          {role === 'admin' && (
            <p>
              Manager: {user.manager}
            </p>
          )}
          <br></br>

        </div>
      ))}
    </div>
  );
}

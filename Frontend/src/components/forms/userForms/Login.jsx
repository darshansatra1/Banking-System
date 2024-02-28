// Inside your Login component
import { FcCurrencyExchange } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../state/features/User/Auth/authSlice"; // Import the login action
import FormButton from "../../shared/FormButton";
import { Logo } from "../../shared/Logo";
import React, { useState } from "react";

import axios from "axios";
import Cookies from 'js-cookie';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const routeAsPerRole = async (userRole) => {  
    console.log(userRole);  
    let path = "/login";
    switch (userRole) {
      case 'customer':
      case 'merchant':
        path = "/externalUserDashboard"
        break;
      case 'admin':  
      case 'employee':
      case 'manager':
        path =  "/internalUserDashboard"
        break;
      default:
        path = "/login"
    }
    setTimeout(() => {
      navigate(path);
    }, 1000);

  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/login";
    try {
      const response = await axios.post(url, inputValue);
      routeAsPerRole(response.data.role);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle 401 Unauthorized error
        setError('Unauthorized. Please log in.');
      } else {
        // Handle other errors
        setError('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div className="w-full lg:w-[40%] max-w-md block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-blue-800 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 border-blue-800 select-none">
        <FcCurrencyExchange className="mr-1" size={45} />
        <span>Login</span>
      </h3>
      <form className="mt-10" onSubmit={handleLogin}>
        <div className="mb-6">
          <label htmlFor="email" className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Your Password"
            required
          />
        </div>

        <FormButton
          text={{ loading: "Processing", default: "Login" }}
          icon={<RiLoginCircleFill className="mb-[-2px] ml-1" size={27} />}
          onClick={handleLogin}
        />
        {error && <p>Error: {error}</p>}
        <p className="text-gray-800 mt-6 text-center">
          Not a Client?{" "}
          <Link
            to="/register"
            className="mx-2 text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
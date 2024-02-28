import React, { useState } from "react";
import axios from "axios";

import { FcCurrencyExchange } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import FormButton from "../../shared/FormButton";
import { Logo } from "../../shared/Logo";
import MessagesContainer from "../../shared/MessagesContainer";
import { InputsValidator } from "../helpers/InputsValidator";

 

export default function Register() {
  const [formInputs, setFormInputs] = useState({
    user_name: "",
    password: "",
    email: "",
    role: "customer",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInputs["role"])
    try {
      if(formInputs["role"] == "customer" || formInputs["role"] == "merchant") {

        const url = "http://localhost:8080/register";
        const { data: res } = await axios.post(url, formInputs);
        navigate("/login");
      }


      if(formInputs["role"] == "manager" || formInputs["role"] == "employee") {
  
        const url = "http://localhost:8080/register";
        const { data: res } = await axios.post(url, formInputs);
        navigate("/login");
        
        
      }
    }

     catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 w-full mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-blue-800 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 border-blue-800 select-none" onSubmit={handleSubmit}>
        <FcCurrencyExchange className="mr-1" size={45} />
        <span>Register</span>
      </h3>

      <form className="mt-10">
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="user_name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Full name
          </label>
          <input
            type="text"
            name="user_name"
            value={formInputs.user_name}
            onChange={(e) =>
              setFormInputs({ ...formInputs, UserName: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Full Name"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="email"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Email address
          </label>

          <input
            type="email"
            name="email"
            value={formInputs.email}
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type Your Email Address"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="password"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formInputs.password}
            onChange={(e) =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Type A Strong Password"
            required
          />
        </div>

        {/* Role selection */}
        <div className="relative z-0 w-full mb-6">
          <label
            htmlFor="role"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Select Role
          </label>
          <select
            name="role"
            value={formInputs.role}
            onChange={(e) =>
              setFormInputs({ ...formInputs, role: e.target.value })
            }
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        {/* Role selection */}

        {error && <div className="text-red-600">{error}</div>}

        {/*form button */}
        <FormButton
          text={{ loading: "Processing", default: "Register" }}
          
          icon={<TiUserAdd className="mb-[-2px] ml-1" size={27} />}
        />
      </form>
    </div>
  );
}

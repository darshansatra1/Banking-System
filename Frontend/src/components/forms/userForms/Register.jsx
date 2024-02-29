import React, { useState } from "react";
import axios from "axios";

import { FcCurrencyExchange } from "react-icons/fc";
import { TiUserAdd } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
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
    <div class="px-6 py-12 text-center md:px-12 lg:py-24 lg:text-left">
      <div class="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="mt-12 lg:mt-0 z-index: 10">
            <h1 class="mt-0 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,81%,95%)]">
                Welcome!  <br /><span class="text-[hsl(218,81%,75%)]">Fill in the details to register</span>
            </h1>

            <p className="text-slate-100 !font-sans text-sm md:text-base lg:text-lg leading-5 my-5 drop-shadow">
                You are only a few steps away from completely revolutionalizing your online banking journey.
            </p>
          </div>
          <div class="relative mb-12 lg:mb-0">
            <div id="radius-shape-1" class="absolute rounded-full shadow-lg"></div>
            <div id="radius-shape-2" class="absolute shadow-lg"></div>
            <div
              class="relative backdrop-blur-[25px] backdrop-saturate-[200%] block rounded-lg px-6 py-12  dark:bg-[hsla(0,0%,15%,0.9)] dark:shadow-black/20 md:px-12">

      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6">
          <label htmlFor="user_name" className="block" >
            <span class="block text-sm font-medium text-slate-100">Full Name</span>
            <input required type="text" name="user_name" value={formInputs.user_name}
              onChange={(e) => setFormInputs({ ...formInputs, user_name: e.target.value })}
              class="peer ... py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
              placeholder="Enter your Full Name"
            />
          </label>
        </div>

        <div className="relative z-0 w-full mb-6">
          <label class="block" htmlFor="email" >
            <span class="block text-sm font-medium text-slate-100">Email Address</span>
            <input type="email" name="email"required value={formInputs.email} 
            onChange={(e) =>
              setFormInputs({ ...formInputs, email: e.target.value })
            }
            class="peer ... py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300" placeholder="you@site.com"/>
            {/* <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p> */}
          </label>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <label htmlFor="password" className="block">
            <span class="block text-sm font-medium text-slate-100">Password</span>
            <input
            type="password"
            name="password"
            value={formInputs.password}
            onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
            className="py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
            placeholder="Type A Strong Password"
            required
            />
          </label>

          
        </div>

        {/* Role selection */}
        <div className="relative z-0 w-full mb-6">
          <label htmlFor="role" class="block" >
            <span class="block text-sm font-medium text-slate-100">Select Role</span>
            <select
              name="role"
              value={formInputs.role}
              onChange={(e) =>
                setFormInputs({ ...formInputs, role: e.target.value })
              }
              class="py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
            >
              <option value="customer">Customer</option>
              <option value="merchant">Merchant</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </label>
          
          </div>
          {/* Role selection */}

          {error && <div className="mt-2 text-pink-600 text-sm">{error}</div>}

          {/*form button */}
          <br/>
          <button type="button" data-te-ripple-init data-te-ripple-color="light" onClick={handleSubmit}
            class="mb-6 inline-block w-full rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            Register
          </button>

          <p className="text-slate-200 mt-6 text-center">
            Already registered?{" "}
            <Link
              to="/login"
              className="mx-2 text-blue-400 hover:text-blue-600 focus:text-blue-100 transition duration-100 ease-in-out"
            >
              Login
            </Link>
          </p>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Inside your Login component

import React, { useState, useEffect } from "react";
import { FcCurrencyExchange } from "react-icons/fc";
import { RiLoginCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../shared/FormButton";
import { Logo } from "../../shared/Logo";
import MessagesContainer from "../../shared/MessagesContainer";
import { login } from "../../../state/features/User/Auth/authSlice";

export default function Login() {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    role: "Customer", // Default role
    msg: ""
  });

  const { email, password, role, msg } = formInputs;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/");
    }
  }, [isSuccess, user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formInputs));
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
            onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
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
            onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200">
            Select Role
          </label>
          <select
            name="role"
            value={role}
            onChange={(e) => setFormInputs({ ...formInputs, role: e.target.value })}
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value="customer">Customer</option>
            <option value="Merchant">Merchant</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {(isError || isSuccess) && (
          <MessagesContainer
            msg={msg}
            isSuccess={isSuccess}
            isError={isError}
          />
        )}

        <FormButton
          text={{ loading: "Processing", default: "Login" }}
          isLoading={isLoading}
          icon={<RiLoginCircleFill className="mb-[-2px] ml-1" size={27} />}
          onClick={handleLogin}
        />

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

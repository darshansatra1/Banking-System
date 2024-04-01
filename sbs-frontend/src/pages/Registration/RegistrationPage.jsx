import React, { useState } from "react";
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const RegistrationPage = () => {
    const [formInputs, setFormInputs] = useState({
        user_name: "",
        address: "",
        phone_number: "",
        password: "",
        email: "",
        role: "customer",
        dob: "",
      });
    
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const url = "http://localhost:8080/register";
        await axios.post(url, formInputs);
        navigate("/login");
    } catch (error) {
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

    // Validate mobile number format
    const validateMobileNumber = (value) => {
        const isValid = /^\d{0,10}$/.test(value); // Allow maximum 10 digits
        return isValid;
    };

    
  return (
    <>
        <Navbar/>
        <div className="min-h-screen max-w-7xl w-full mx-auto flex justify-center items-center flex-col lg:flex-row gap-4 p-4 md:p-10">
            <div className="px-6 py-12 text-center md:px-12 lg:py-24 lg:text-left">
                <div className="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="mt-12 lg:mt-0 z-index: 10">
                        <h1 className="mt-0 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,81%,95%)]">
                        Welcome! <br />
                        <span className="text-[hsl(218,81%,75%)]">Fill in the details to register</span>
                        </h1>

                        <p className="text-slate-100 !font-sans text-sm md:text-base lg:text-lg leading-5 my-5 drop-shadow">
                        You are only a few steps away from completely revolutionizing your online banking journey.
                        </p>
                    </div>
                    <div  class="relative backdrop-blur-[25px] backdrop-saturate-[200%] block rounded-lg px-6 py-12  dark:bg-[hsla(0,0%,15%,0.9)] dark:shadow-black/20 md:px-12">
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="relative z-0 w-full mb-6">
                            <label htmlFor="user_name" className="block">
                            <span className="block text-sm font-medium text-slate-100">Full Name</span>
                            <input
                                required
                                type="text"
                                name="user_name"
                                value={formInputs.user_name}
                                onChange={(e) => setFormInputs({ ...formInputs, user_name: e.target.value })}
                                className="peer ... py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
                                placeholder="Enter your Full Name"
                            />
                            </label>
                        </div>

                        {/* Email Address */}
                        <div className="relative z-0 w-full mb-6">
                            <label htmlFor="email" className="block">
                            <span className="block text-sm font-medium text-slate-100">Email Address</span>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formInputs.email}
                                onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
                                className="peer ... py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
                                placeholder="you@site.com"
                            />
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <label htmlFor="password" className="block">
                            <span className="block text-sm font-medium text-slate-100">Password</span>
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

                        {/* Mobile Number */}
                        <div className="relative z-0 w-full mb-6">
                            <label htmlFor="user_number" className="block">
                            <span className="block text-sm font-medium text-slate-100">Mobile Number</span>
                            <input
                                type="tel"
                                name="user_number"
                                value={formInputs.phone_number}
                                onChange={(e) => {
                                const value = e.target.value;
                                if (validateMobileNumber(value)) {
                                    setFormInputs({ ...formInputs, phone_number: value });
                                }
                                }}
                                pattern="[0-9]*"
                                maxLength="10"
                                className="peer ... py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
                                placeholder="Enter your Mobile Number"
                            />
                            </label>
                        </div>

                        {/* Address */}
                        <div className="relative z-0 w-full mb-6">
                            <label htmlFor="address" className="block">
                            <span className="block text-sm font-medium text-slate-100">Address</span>
                            <textarea
                                required
                                name="address"
                                value={formInputs.address}
                                maxLength="50"
                                onChange={(e) => setFormInputs({ ...formInputs, address: e.target.value })}
                                className="peer ... py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
                                placeholder="Enter your Full Address"
                            />
                            </label>
                        </div>

                        {/* DOB */}
                        <div className="relative z-1 w-full mb-6">
                        <label htmlFor="role" className="block">
                            <span className="block text-sm font-medium text-slate-100">Date of birth</span>
                                <DatePicker
                                className="py-2 px-2 ps-2 z-50 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
                                // It accepts the inputs but in following 2 lines, make changes to the logic in order for it to be
                                // accepted alongwith the form inputs. 
                                selected={formInputs.dob}
                                onChange={date => setFormInputs({ ...formInputs, dob: date })}
                                // filterDate={date => date.getDay() != 5}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                placeholder="MM/DD/YYYY"
                                />
                        </label>
                        </div>

                        {/* Role selection */}
                        <div className="relative z-0 w-full mb-6">
                            <label htmlFor="role" className="block">
                            <span className="block text-sm font-medium text-slate-100">Select Role</span>
                            <select
                                name="role"
                                value={formInputs.role}
                                onChange={(e) => setFormInputs({ ...formInputs, role: e.target.value })}
                                className="py-2 px-2 ps-2 block w-full border-gray-100 shadow-sm rounded-lg text-sm focus:z-10 focus:border-slate-300 focus:ring-slate-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-300 dark:border-gray-300 dark:text-gray-900 dark:focus:ring-gray-300"
                            >
                                <option value="customer">Customer</option>
                                <option value="merchant">Merchant</option>
                                <option value="manager">Manager</option>
                                <option value="employee">Employee</option>
                            </select>
                            </label>
                        </div>


                        {error && <div className="mt-2 text-pink-600 text-sm">{error}</div>}

                        {/* Form button */}
                        <br />
                        <button
                            type="submit"
                            className="mb-6 inline-block w-full rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
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
        <Footer/>
    </>
  )
}

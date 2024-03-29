import React from 'react'
import { Link } from 'react-router-dom';
import {Outlet} from "react-router-dom";
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';

export const UserDashboard = () => {
  return (
    <>
        <Navbar />
        <div className="flex">
        {/* Sidebar */}
            <div className="h-screen bg-neutral-800 py-2 shadow-sm shadow-black/30 dark:bg-neutral-800 dark:shadow-black/30 text-white w-64">
                <nav className="mt-10">
                <Link to="/user/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
                <Link to="/deposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit</Link>
                <Link to="/withdraw" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Withdraw</Link>
                <Link to="/deposithistory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit History</Link>
                <Link to="/withdrawhistory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Withdraw History</Link>
                {/* <Link to="/transfer" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Transfer Fund</Link> */}
                {/* <Link to="/credit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Credit Fund</Link> */}
                <Link to="/logout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Logout</Link>          
                
                {/* Add more links as needed */}

                </nav>
            </div>
        {/* Page Content */}
        <div className="flex-1 p-5">
            <Outlet />
        </div>
        </div>
        <Footer/>
    </>
  )
}

import React from 'react'
import { Link } from 'react-router-dom';
import {Outlet} from "react-router-dom";
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';

export const UserDashboard = () => {
  const {user} = useAuth();

  return (
    <>
        <Navbar />
        <div className="flex">
        {/* Sidebar */}
            <div className="h-screen bg-neutral-800 py-2 shadow-sm shadow-black/30 dark:bg-neutral-800 dark:shadow-black/30 text-white w-64">
                <nav className="mt-10">
                <Link to="/user" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
                <Link to="/user/deposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit</Link>
                <Link to="/user/withdraw" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Withdraw</Link>
                <Link to="/user/deposit_history" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit History</Link>
                <Link to="/user/withdraw_history" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Withdraw History</Link> 
                {user.role == "customer" && 
                ( 
                <Link to="/user/bill" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Pay Bill</Link> 
                )}
                <Link to="/user/logout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Logout</Link>          
                
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

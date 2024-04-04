import React from 'react'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';
import {Outlet} from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <> 
        <Navbar />
        <div className="flex">
        {/* Sidebar */}
            <div className="h-screen bg-neutral-800 py-2 shadow-sm shadow-black/30 dark:bg-neutral-800 dark:shadow-black/30 text-white w-64">
                <nav className="mt-10">
                <Link to="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
                <Link to="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Users</Link>
                <Link to="/admin/depositTransactions" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit Transactions</Link>
                <Link to="/admin/withdrawTransactions" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Withdraw Transactions</Link>
                <Link to="/admin/logout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Logout</Link> 
                {/* Add more links as needed */}

                </nav>
            </div>
        {/* Page Content */}
        <div className="flex-1 p-5">
            <Outlet />
        </div>
        </div>
        <Footer />
    </>
  )
}

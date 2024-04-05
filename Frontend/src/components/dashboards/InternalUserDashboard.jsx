import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Logo } from "../../components/shared/Logo";
import Footer from "../../components/home/components/layout/Footer";

const InternalUserDashboard = ({ children }) => {
  
  return (
    <>
      <nav className="relative flex w-full items-center justify-between bg-neutral-800 py-2 shadow-sm shadow-black/30 dark:bg-neutral-800 dark:shadow-black/30 lg:flex-wrap lg:justify-start" data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-6">
          <div className="flex items-center">
            <button className="block border-0 bg-transparent py-2 pr-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" data-te-collapse-init data-te-target="#navbarSupportedContentY" aria-controls="navbarSupportedContentY" aria-expanded="false" aria-label="Toggle navigation">
              <span className="[&>svg]:w-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                  <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <div className="max-w-[200px]">
              <Logo bg={false} textSize="text-lg md:text-2xl lg:text-3xl" />
            </div>
          </div>
          <div className="my-1 flex items-center lg:my-0 lg:ml-auto"></div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <div className="h-screen bg-neutral-800 py-2 shadow-sm shadow-black/30 dark:bg-neutral-800 dark:shadow-black/30 text-white w-64">
          <nav className="mt-10">

              <Link to="/Internalprofile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                Profile
              </Link>
            
            <Link to="/userListView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              User List
            </Link>
            <Link to="/depositTransactionListView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Deposit Transactions
            </Link>

            
            <Link to="/withdrawTransactionListView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Withdraw Transactions
            </Link>

            <Link to="/internallogout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              Logout
            </Link>
            {/* Add more links as needed */}
          </nav>
        </div>
        {/* Page Content */}
        <div className="flex-1 p-5">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default InternalUserDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Logo } from "../../components/shared/Logo";
import Footer from "../../components/home/components/layout/Footer";


// export default const InternalUserDashboard() = ({ children }) => {
  const InternalUserDashboard = ({ children }) => {  
  const navigate = useNavigate(); 
  const [isEmployeeOrManager, setIsEmployeeOrManager] = useState(null);
  
  useEffect(() => {
    const onPageLoad = async () => {
      const role = Cookies.get('role');
      if(role) {
        const isEmployeeOrManagerVal = (role == 'customer' || role == 'manager') ? true : false;
        setIsEmployeeOrManager(isEmployeeOrManagerVal); 
      } else {
        TODO: // remove this log during deploy
        console.error("Role not found in cookie");
        navigate("/login");
      }
    };
    onPageLoad();
  }, [navigate]);

  return (
    <>
    <nav
        class="relative flex w-full items-center justify-between bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30 lg:flex-wrap lg:justify-start"
        data-te-navbar-ref>
        <div class="flex w-full flex-wrap items-center justify-between px-6">
          <div class="flex items-center">
            <button
              class="block border-0 bg-transparent py-2 pr-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button" data-te-collapse-init data-te-target="#navbarSupportedContentY"
              aria-controls="navbarSupportedContentY" aria-expanded="false" aria-label="Toggle navigation">
              <span class="[&>svg]:w-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                  <path fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </button>

            <div className="max-w-[200px]">
              <Logo bg={false} textSize="text-lg md:text-2xl lg:text-3xl" />
            </div>
          </div>

          <div class="my-1 flex items-center lg:my-0 lg:ml-auto">
            
          </div>
        </div>
      </nav>
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen bg-white py-2 shadow-sm shadow-neutral-700/10 dark:bg-neutral-800 dark:shadow-black/30 text-white w-64">
        <nav className="mt-10">
        {isEmployeeOrManager && (
          <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
        )}
          <Link to="/userListView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">User List</Link>
          <Link to="/depositTransactionListView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit Transactions</Link>
          <Link to="/withdrawTransactionListView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Withdraw Transactions</Link>
          {/* Add more links as needed */}
        </nav>
      </div>
      {/* Page Content */}
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default InternalUserDashboard;


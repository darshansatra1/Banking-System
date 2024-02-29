import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


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
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen bg-gray-800 text-white w-64">
        <nav className="mt-10">
        {isEmployeeOrManager && (
          <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
        )}
          <Link to="/homeView" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">User List</Link>
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
  );
}

export default InternalUserDashboard;


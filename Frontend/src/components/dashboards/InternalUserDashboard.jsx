import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


// export default const InternalUserDashboard() = ({ children }) => {
  const InternalUserDashboard = ({ children }) => {  

  
  const [depositTransactionsList, setDepositTransactionsData] = useState(null);

  useEffect(() => {
    const getDepositTransactions = async () => {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve([{ amount: 1000, user_name: "xyz", user_account_no: 12345 },
                   { amount : 500, user_name: "abc", user_account_no: 56789},
                   {amount : 700, user_name: "qwer", user_account_no: 8908}]);
        }, 1000);
      });

      setDepositTransactionsData(response);
      console.log("after set");
    };
    getDepositTransactions();

  }, []); 

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen bg-gray-800 text-white w-64">
        <nav className="mt-10">
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


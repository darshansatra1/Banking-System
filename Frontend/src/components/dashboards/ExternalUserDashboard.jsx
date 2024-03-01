// ExternalUserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ExternalUserDashboard = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen bg-gray-800 text-white w-64">
        <nav className="mt-10">
          <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Profile</Link>
          <Link to="/deposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Deposit</Link>
          <Link to="/transfer" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Transfer Fund</Link>
          <Link to="/credit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Credit Fund</Link>
          <Link to="/logout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Logout</Link>

      
          {/* Add more links as needed */}
        </nav>
      </div>
      {/* Page Content */}
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default ExternalUserDashboard;

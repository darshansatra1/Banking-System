import React, { useState } from 'react';
import {useAuth} from "../../../hooks/useAuth";
import { Navigate } from 'react-router-dom'; 

export const UserLogoutPage = () => {
    const {user, logout} = useAuth();
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [confirmLogout, setConfirmLogout] = useState(false); // State to manage logout confirmation

    // Function to handle logout confirmation
    const handleConfirmLogout = () => {
        // Set loading state to true to indicate logout in progress
        setLoading(true);

        // Simulate an asynchronous logout process
        setTimeout(() => {
            // Remove cookies 
            logout();

            // Set loading to false after logout process completes
            setLoading(false);

            // Set confirmLogout to true to trigger navigation to login page
            setConfirmLogout(true);
        }, 1000); // Simulating a delay for demonstration purposes
    };

    // Function to cancel logout
    const handleCancelLogout = () => {
        setConfirmLogout(false);
    };

    // If confirmLogout state is true, navigate to login page
    if (confirmLogout) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                {loading ? (
                    <p className="text-center">Logging out...</p>
                ) : (
                    <div>
                        <p className="mb-4">Are you sure you want to logout?</p>
                        <div className="flex justify-center">
                            <button 
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none"
                                onClick={handleConfirmLogout}
                            >
                                Confirm Logout
                            </button>
                            <button 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
                                onClick={handleCancelLogout}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import Cookies
import { Navigate } from 'react-router-dom'; // Import Navigate for programmatic navigation

const LogoutPage = () => {
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [loggedOut, setLoggedOut] = useState(false); // State to manage logged out state
    const [confirmLogout, setConfirmLogout] = useState(false); // State to manage logout confirmation

    useEffect(() => {
        // Function to handle logout
        const logout = async () => {
            // Simulate an asynchronous logout process
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating a delay for demonstration purposes

            // Remove cookies
            Cookies.remove('token');
            Cookies.remove('role');

            // Set loading to false after logout process completes
            setLoading(false);

            // Set loggedOut to true to trigger the Navigate component
            setLoggedOut(true);
        };

        // Call logout function
        logout();
    }, []);

    // Function to handle logout confirmation
    const handleConfirmLogout = () => {
        setConfirmLogout(true);
    };

    // If confirmLogout state is true, navigate to login page
    if (confirmLogout) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {loading ? (
                <p>Logging out...</p>
            ) : (
                <div>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={handleConfirmLogout}>Confirm Logout</button>
                    <button onClick={() => setConfirmLogout(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default LogoutPage;

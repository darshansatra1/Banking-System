import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies

const DepositHistory = ({ role }) => { // Accept 'role' as a prop
    const [depositHistory, setDepositHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        setErrorMessage('');

        const token = Cookies.get('token'); // Get token from cookies
        const role = Cookies.get('role')

        // Check if token exists
        if (token) {
            // Make API request to fetch deposit history
            axios.get(`http://localhost:8080/${role}/deposit`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
            })
            .then(response => {
                setDepositHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching deposit history:', error);
                setErrorMessage('An error occurred while fetching deposit history.');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            console.error('Token not found in cookies');
            setLoading(false);
        }
    }, [role]); // Add 'role' to the dependency array

    return (
       <div className="container mx-auto py-8">
    <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-md"> {/* Adjust max-w-xl to your desired width */}
        <div className="p-2">

                    <h2 className="text-2xl font-semibold mb-4">Deposit History</h2>
                    {loading ? (
                        <p>Loading deposit history...</p>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : depositHistory.length === 0 ? (
                        <p>No deposit history available.</p>
                    ) : (
                        <ul>
                            {depositHistory.map((deposit, index) => (
                                <li key={index} className="mb-2">
                                    <span className="font-bold">Amount:</span> {deposit.amount}, <span className="font-bold">Date:</span> {deposit.date_created}<span className="font-bold">Status:</span> {deposit.status}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DepositHistory;

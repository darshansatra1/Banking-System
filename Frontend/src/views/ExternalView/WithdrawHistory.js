import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies

const WithdrawalHistory = ({ role }) => { // Accept 'role' as a prop
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        setErrorMessage('');

        const token = Cookies.get('token'); // Get token from cookies
        const role = Cookies.get('role')
        // Check if token exists
        if (token) {
            // Make API request to fetch withdrawal history
            axios.get(`http://localhost:8080/${role}/withdraw`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
            })
            .then(response => {
                setWithdrawalHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching withdrawal history:', error);
                setErrorMessage('An error occurred while fetching withdrawal history.');
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
            <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                <div className="p-6">

                    <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                        <span>Withdrawal History</span>
                    </h3>
                    {loading ? (
                        <p className="text-gray-100">Loading withdrawal history...</p>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : withdrawalHistory.length === 0 ? (
                        <p className="text-gray-100">No withdrawal history available.</p>
                    ) : (
                        <ul>
                            {withdrawalHistory.map((withdrawal, index) => (
                                <li key={index} className="block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-white-100 hover:text-white-500 focus:bg-white-100 focus:text-white-500 focus:ring-0 dark:hover:bg-teal-900 dark:hover:text-white-200 dark:focus:bg-green-600 dark:focus:text-white-200">
                                    {/* <span className="font-bold">Amount:</span> {withdrawal.amount}, <span className="font-bold">Date:</span> {withdrawal.date_created}, <span className="font-bold">Status:</span> {withdrawal.status} */}
                                    <div
                                        class="flex items-center space-x-4 rtl:space-x-reverse text-slate-900 group-hover:text-white text-sm">
                                        <div class="flex-shrink-0 w-8 h-8 rounded-full">
                                            {/* <img class="w-8 h-8 rounded-full" src="" alt="Neil image"> */}
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                                <strong>Amount: </strong> {withdrawal.amount}
                                            </p>
                                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                                <strong>Date Created: </strong> {withdrawal.date_created}
                                            </p>
                                        </div>
                                        <div
                                            class="text-white bg-blue-700 rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
                                            <strong>Status:</strong> {withdrawal.status}
                                        </div>
                                    </div>
                                </li>
                                
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WithdrawalHistory;
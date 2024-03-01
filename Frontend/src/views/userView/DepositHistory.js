import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepositHistory = () => {
    const [depositHistory, setDepositHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        setErrorMessage('');

        // Make API request to fetch deposit history
        axios.get('http://localhost:8080/merchant/deposit')
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
    }, []);

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
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
                                    <span className="font-bold">Amount:</span> {deposit.amount}, <span className="font-bold">Date:</span> {deposit.date}
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

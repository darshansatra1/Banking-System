import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../../hooks/useAuth";
import { UserDepositListCard } from '../../../components/User/UserDepositListCard';

export const UserDepositHistoryPage = () => {
    const [depositHistory, setDepositHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        setLoading(true);
        setErrorMessage(''); 
        // Check if token exists
        if (user.token) {
            // Make API request to fetch deposit history
            axios.get(`http://localhost:8080/${user.role}/deposit`, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include token in the headers
                },
            })
            .then(response => {
                setDepositHistory(response.data);
            })
            .catch(error => {
                setErrorMessage('An error occurred while fetching deposit history.');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            console.error('Token not found in cookies');
            setLoading(false);
        }
    }, [user.role]);

  return (
    <div>
        <div className="container mx-auto py-8">
            <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                <div className="p-6">

                    <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                        <span>Deposit History</span>
                    </h3>
                    {loading ? (
                        <p className="text-gray-100">Loading deposit history...</p>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : depositHistory.length === 0 ? (
                        <p className="text-gray-100">No deposit history available.</p>
                    ) : (
                        <ul>
                            {depositHistory.map((deposit, index) => (
                                <UserDepositListCard deposit={deposit}/>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

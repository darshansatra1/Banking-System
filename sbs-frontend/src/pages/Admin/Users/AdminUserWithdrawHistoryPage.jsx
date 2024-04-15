import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import { UserWithdrawListCard } from '../../../components/User/UserWithdrawListCard';

export const AdminUserWithdrawHistoryPage = () => {
    const { userId, userRole } = useParams();
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAuth();


    useEffect(() => {
        setLoading(true);
        setErrorMessage(''); 
        // Check if token exists
        if (user.token) {
            // Make API request to fetch withdrawal history
            axios.get(`https://156.56.103.231:8080/${user.role}/user/${userId}/withdraw?role=${userRole}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include token in the headers
                },
            })
            .then(response => {
                setWithdrawalHistory(response.data);
            })
            .catch(error => { 
                setErrorMessage('An error occurred while fetching withdrawal history. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
        } else { 
            setLoading(false);
        }
    }, [user.role]); // Add 'role' to the dependency array

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
                                <UserWithdrawListCard withdrawal={withdrawal} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );

}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'; // Assuming you have a custom hook for authentication

const BillHistory = () => {
    const [billHistory, setBillHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Assuming you have a custom hook for authentication
    const navigate = useNavigate(); // React Router's hook for navigation

    useEffect(() => {
        const fetchBillHistory = async () => {
            try {
                if (!user || !user.role || !user.token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:8080/merchant/bills`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setBillHistory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bill history:', error);
            }
        };

        fetchBillHistory();
    }, [user, navigate]);

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Bill History</h2>
            {loading ? (
                <p>Loading bill history...</p>
            ) : (
                <div className="flex flex-wrap -mx-4">
                    {billHistory.map((bill, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                            <div className="bg-white rounded shadow-md p-6">
                                <h3 className="text-xl font-bold mb-2">{bill.bill_number}</h3>
                                <p className="text-gray-700 mb-4">Amount: {bill.amount}</p>
                                <p className="text-gray-700 mb-4">Date: {bill.date_created}</p>
                                <p className="text-gray-700 mb-4">Status: {bill.merchant}</p>
                                <p className="text-gray-700 mb-4">Status: {bill.customer}</p>
                                <p className="text-gray-700 mb-4">Status: {bill.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// "_id": "660f4b2d738c7b2fa47afe26",
//         "status": "pending",
//         "amount": 150,
//         "date_created": "2024-04-05T00:51:57.443Z",
//         "merchant": "John Harris",
//         "customer": "nkjnkjnkjnkjnkj"

export default BillHistory;

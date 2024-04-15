import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'; // Assuming you have a custom hook for authentication
import { MerchantBillCard } from '../../../components/User/MerchantBillCard';

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

                const response = await axios.get(`https://156.56.103.231:8080/merchant/bills`, {
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
        <div className="w-full max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
            <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                <span> Bill History</span>
            </h3>
            {loading ? (
                <p className="text-gray-100">Loading deposit history...</p>
                ) : billHistory.length === 0 ? (
                    <p className="text-gray-100">No deposit history available.</p>
            ) : (
                <ul>
                    {billHistory.map((bill, index) => (
                        <MerchantBillCard key={index} bill={bill} index={index} />
                    ))}
                </ul>
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

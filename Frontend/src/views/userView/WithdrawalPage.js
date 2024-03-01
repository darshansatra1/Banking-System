import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



const WithdrawalPage = () => {

    const [withDrawAmount, setwithDrawalAmount] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');





const handleWithDrawal = async () => {
//     // Check deposit amount limit
//     if (parseInt(depositAmount) > 10000) {
//         setErrorMessage('Deposit amount cannot exceed 10,000.');
//         setLoading(false);
//         return;
//     }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');


    try {
        // Get token from cookie
        const token = Cookies.get('token');

        // Make API request to deposit amount
        const response = await axios.post(
            'http://localhost:8080/customer/withdraw',
            { amount: parseInt(withDrawAmount), password },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the headers
                },
            }
        );

        if (response.data.success) {
            setSuccessMessage('Withdraw successful!');
        } else {
            setErrorMessage('Withdraw failed.');
        }
    } catch (error) {
        console.error('Error withdraw amount:', error);
        setErrorMessage('An error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
};

    return (
    <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Withdraw</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="withdrawamount">
                        Withdraw Amount
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="depositAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={withDrawAmount}
                        onChange={(e) => setwithDrawalAmount(e.target.value)}
                        
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <button
                    className="bg-blue-500 text-white py-2 px-4 mt-4"
                    onClick={handleWithDrawal}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Deposit'}
                </button>
            </div>
        </div>
    </div>
);
    
};

export default WithdrawalPage;

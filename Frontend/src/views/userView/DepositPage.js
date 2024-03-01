import React, { useState } from 'react';
import axios from 'axios';

const DepositPage = () => {
    const [depositAmount, setDepositAmount] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleDeposit = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        // Check deposit amount limit
        if (parseInt(depositAmount) > 100000) {
            setErrorMessage('Deposit amount cannot exceed 100,000.');
            setLoading(false);
            return;
        }

        try {
            // Make API request to validate password and deposit amount
            const response = await axios.post('/api/deposit', { amount: depositAmount, password });
            if (response.data.success) {
                setSuccessMessage('Deposit successful!');
            } else {
                setErrorMessage('Incorrect password.');
            }
        } catch (error) {
            console.error('Error depositing amount:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Deposit</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="depositAmount">
                            Deposit Amount
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="depositAmount"
                            type="number"
                            placeholder="Enter amount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            max={100000}
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
                        onClick={handleDeposit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Deposit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;

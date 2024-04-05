import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateBill = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [billAmount, setBillAmount] = useState('');
    const [accountId, setAccountId] = useState('');
    const [description, setDescription] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);

    const handleGenerateBill = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            if (!user.token) {
                console.error("Token not found in user object");
                navigate("/login");
                return;
            }

            if (!billAmount || isNaN(parseFloat(billAmount))) {
                setErrorMessage('Please enter a valid bill amount');
                setLoading(false);
                return;
            }

            // Step 1: Generate OTP
            const otpResponse = await axios.get('http://localhost:8080/merchant/otp', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (otpResponse.status === 200 || otpResponse.status === 201) {
                setSuccessMessage('OTP has been sent, please check your inbox.');
                setShowOtpField(true);
            } else {
                setErrorMessage('Failed to generate OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBill = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            if (!user.token) {
                console.error("Token not found in user object");
                navigate("/login");
                return;
            }

            // Step 2: Create bill
            const billData = {
                amount: billAmount,
                description: description,
                account_id: accountId,
                otp: otp,
            };
            const billResponse = await axios.post('http://localhost:8080/merchant/bill', billData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (billResponse.data.success) {
                setSuccessMessage('Bill generated successfully.');
                navigate("/user/bill_history");
                return;
                // You can perform further actions here if needed
            } else {
                setErrorMessage('Failed to generate bill. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                <div className="p-6">
                    <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                        <span>Create Bill</span>
                    </h3>
                    <div className="mb-4">
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="billAmount">
                            Bill Amount
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="billAmount"
                            type="number"
                            placeholder="Enter amount"
                            value={billAmount}
                            onChange={(e) => setBillAmount(e.target.value)}
                            max={100000}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="accountId">
                            Account ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="accountId"
                            type="text"
                            placeholder="Enter account ID"
                            value={accountId}
                            onChange={(e) => setAccountId(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {showOtpField && (
                        <div className="mb-4">
                            <label className="block text-gray-100 font-bold mb-2" htmlFor="otp">
                                OTP
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                id="otp"
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <button
                        className="mb-6 inline-block w-full rounded-lg bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-m font-big uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onClick={showOtpField ? handleCreateBill : handleGenerateBill}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : showOtpField ? 'Generate Bill' : 'Request OTP'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBill;

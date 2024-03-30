import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../hooks/useAuth";

export const DepositPage = () => {
    const [depositAmount, setDepositAmount] = useState('');
    const [otp, setOtp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {user} = useAuth();

    const handleGenerateOtp = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        if (parseInt(depositAmount) > 100000) {
            setErrorMessage('Deposit amount cannot exceed 100,000.');
            setLoading(false);
            return;
        }

        try{
            if(user.token){
                const response = await axios.get(`http://localhost:8080/${user.role}/otp`,{
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    }
                });
                if(response.status === 200 || response.status === 201){
                    setSuccessMessage("OTP has been sent, please check your inbox.");
                    setShowOtpField(true);
                }else{
                    setErrorMessage("Please try again");
                }
            }
        } catch(error){
            setErrorMessage("An error occured. Please try again later;")
        } finally{
            setLoading(false);
        }
    }

    const handleDeposit = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        if (parseInt(depositAmount) > 100000) {
            setErrorMessage('Deposit amount cannot exceed 100,000.');
            setLoading(false);
            return;
        }

        try{
            if(user.token){
                const response = await axios.post(`http://localhost:8080/${user.role}/deposit`,
                    {
                        amount: depositAmount,
                        otp: otp,
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );
                if(response.data.success){
                    setSuccessMessage("Deposit request created.");
                    setShowOtpField(false);
                }else{
                    setErrorMessage("Please try again");
                }
            }
        } catch(error){
            setErrorMessage("An error occured. Please try again later;")
        } finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <div className="container mx-auto py-8">
            <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                <div className="p-6">
                    <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                        <span>Deposit</span>
                    </h3>
                    <div className="mb-4">
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="depositAmount">
                            Deposit Amount
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="depositAmount"
                            type="number"
                            placeholder="Enter amount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            max={100000}
                        />
                    </div>
                    {showOtpField && (
                            <div className="mb-4">
                            <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
                                OTP
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                                id="otp"
                                type="number"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            </div>
                    )}
                    
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <br/>
                    {showOtpField && (
                        <button
                        className="mb-6 inline-block w-full rounded-lg bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-m font-big uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onClick={handleDeposit}
                        disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Deposit'}
                        </button>
                    )}

                    {!showOtpField && (
                        <button
                        className="mb-6 inline-block w-full rounded-lg bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-m font-big uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onClick={handleGenerateOtp}
                        disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Request'}
                        </button>
                    )}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

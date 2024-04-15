import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../hooks/useAuth";
import DepositTransactionCard from "../../../components/Admin/DepositTransactionCard";

export const AdminDepositTransactionPage = () => {
    const {user} = useAuth();
    const [depositTransactionsList, setDepositTransactionsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getDepositTransactions = async () => {
        try {
            if (!user.role) {
                navigate("/login");
                return;
            }
            if (user.token) {
                const response = await axios.get(`https://156.56.103.231:8080/${user.role}/deposit`, {
                    headers: {
                    Authorization: `Bearer ${user.token}`,
                    },
                });
                setDepositTransactionsData(response.data);
            } else {
                navigate("/login");
            }
        } catch (error) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }   
    };

    useEffect(() => {
        getDepositTransactions();
    }, []);

    const onClick = async (depositId, accept) => {
        try {
          setLoading(true);
          setError(null);
      
          if (!user.role || !user.token) {
            navigate("/login");
            return;
          }
      
          const response = await axios.post(
            'https://156.56.103.231:8080/'+user.role+'/deposit/'+ depositId,
            { accept },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          ); 
          getDepositTransactions();
        } catch (error) {
          window.alert(error.message, () => {
            window.location.reload(); // Reload the page on OK
          });
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
    };
        
    return (
        <div>  
        {/* Original page */}
        {!loading && !error && (
            <div className="w-full max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                    <span>Deposit Transactions to Review</span>
                </h3>
                {depositTransactionsList && Array.isArray(depositTransactionsList) && depositTransactionsList.map((depositTransaction) => (
                    <DepositTransactionCard
                        deposit_id = {depositTransaction._id}
                        user_name= {depositTransaction.user_name}
                        client_id= {depositTransaction.client_id}
                        amount= {depositTransaction.amount}
                        date_created= {depositTransaction.date_created}
                        role= {depositTransaction.role}
                        onClick={onClick}
                    />
                ))}
            </div>
        )}
      </div>
    )
}

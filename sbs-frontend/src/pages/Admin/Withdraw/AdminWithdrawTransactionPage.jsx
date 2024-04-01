import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../../hooks/useAuth";
import WithdrawTransactionCard from "../../../components/Admin/WithdrawTransactionCard";

export const AdminWithdrawTransactionPage = () => {
    const {user} = useAuth();
    const [withdrawTransactionsList, setWithdrawTransactionsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getWithdrawTransactions = async () => {
        try {
          
          if (!user.role) {
            console.error("Role not found in cookie");
            navigate("/login");
            return;
          }
  
          if (user.token) {
            const response = await axios.get('http://localhost:8080/' +user.role +'/withdraw', {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });
            setWithdrawTransactionsData(response.data); 
          } else { 
            navigate("/login");          
          }
        } catch (error) { 
            setError(error.message || "An error occurred");
          } finally {
            setLoading(false); // Set loading to false regardless of success or failure
          }
        };
        
    useEffect(() => {
      getWithdrawTransactions();
    }, []);

    const onClick = async (withdrawId, accept) => {
        try {
          setLoading(true);
          setError(null); 
      
          if (!user.role || !user.token) { 
            navigate("/login");
            return;
          }
      
          const response = await axios.post(
            'http://localhost:8080/'+user.role+'/withdraw/'+ withdrawId,
            { accept },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
      
          getWithdrawTransactions();
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
                <span>Withdraw Transactions to Review</span>
                </h3>
                {withdrawTransactionsList && Array.isArray(withdrawTransactionsList) && withdrawTransactionsList.map((withdrawTransaction) => (
                        <WithdrawTransactionCard
                            withdraw_id = {withdrawTransaction._id}

                            user_name={withdrawTransaction.user_name}
                            client_id={withdrawTransaction.client_id}
                            amount={withdrawTransaction.amount}
                            date_created={withdrawTransaction.date_created}
                            role={withdrawTransaction.role}
                            onClick={onClick}
                        />
                    ))}
            </div>
        )}
      </div>
    );
}

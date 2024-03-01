import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import WithdrawCard from "../../components/shared/admin/WithdrawCard"; // Import the Cookies library


export default function WithdrawTransactionListview() {
  
    const [withdrawTransactionsList, setWithdrawTransactionsData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const getWithdrawTransactions = async () => {
        try {

          const role = Cookies.get('role');
          if (!role) {
            console.error("Role not found in cookie");
            navigate("/login");
            return;
          }
          const token = Cookies.get('token');
  
          if (token) {
            const response = await axios.get('http://localhost:8080/' +role +'/withdraw', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setWithdrawTransactionsData(response.data);
            console.log("Transaction data:", response.data);
          } else {
            console.error("Token not found in cookie");
            navigate("/login");          
          }
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      };
      getWithdrawTransactions();
    }, []);


  

  return (
      <div className="w-full max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
        <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
          <span>Withdraw Transactions to Review</span>
        </h3>
        {withdrawTransactionsList && withdrawTransactionsList.map((withdrawTransaction) => (
            <WithdrawCard
                user_name={withdrawTransaction.user_name}
                client_id={withdrawTransaction.client_id}
                amount={withdrawTransaction.amount}
                date_created={withdrawTransaction.date_created}
                role={withdrawTransaction.role}
            />
        ))}
      </div>
  );
}

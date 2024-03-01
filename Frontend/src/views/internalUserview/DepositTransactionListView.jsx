import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import DepositCard from "../../components/shared/admin/DepositCard"; // Import the Cookies library


export default function DepositTransactionListview() {

    const [depositTransactionsList, setDepositTransactionsData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getDepositTransactions = async () => {
            try {

                const role = Cookies.get('role');
                if (!role) {
                    console.error("Role not found in cookie");
                    navigate("/login");
                    return;
                }

                const token = Cookies.get('token');

                if (token) {
                    const response = await axios.get('http://localhost:8080/' + role + '/deposit', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setDepositTransactionsData(response.data);
                } else {
                    console.error("Token not found in cookie");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };
        getDepositTransactions();
    }, []);


    return (
        <div className="w-full max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
            <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                <span>Deposit Transactions to Review</span>
            </h3>
            {depositTransactionsList && depositTransactionsList.map((depositTransaction) => (
                <DepositCard
                    user_name= {depositTransaction.user_name}
                    client_id= {depositTransaction.client_id}
                    amount= {depositTransaction.amount}
                    date_created= {depositTransaction.date_created}
                    role= {depositTransaction.role}
                />
            ))}
        </div>
    );
}

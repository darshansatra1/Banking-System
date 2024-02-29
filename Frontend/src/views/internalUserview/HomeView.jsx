import { FcCurrencyExchange } from "react-icons/fc";
import { Logo } from "../../components/shared/Logo";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserListView from "../../components/shared/admin/UserListView";


export default function HomeView() {
  
  const [depositTransactionsList, setDepositTransactionsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepositTransactions = async () => {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve([{ balance: 1000, user_name: "User 1", account_id:"65e0108b27cd875bf0a912d5@",email:"user1@gmail.com"},
                   { balance : 500, user_name: "User 2",account_id:"65e0108b27cd875bf0a912d5@",email:"user2@gmail.com"},
                   {balance : 700, user_name: "User 3", account_id:"65e0108b27cd875bf0a912d5@",email:"user3@gmail.com"}]);
        }, 0);
      });

      setDepositTransactionsData(response);
      console.log("after set");
    };
    getDepositTransactions();

  }, []); 

  return (
    <div className="w-full max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
      <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
        <span> User List</span>
      </h3>

      {depositTransactionsList && depositTransactionsList.map((depositTransaction) => (
        <UserListView
            user_name={depositTransaction.user_name}
            email={depositTransaction.email}
            balance={depositTransaction.balance}
            account_id={depositTransaction.account_id}
        />
      ))}
    </div>
  );
}

import { FcCurrencyExchange } from "react-icons/fc";
import { Logo } from "../../components/shared/Logo";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function HomeView() {
  
  const [depositTransactionsList, setDepositTransactionsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepositTransactions = async () => {
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve([{ amount: 1000, user_name: "xyz", user_account_no: 12345 },
                   { amount : 500, user_name: "abc", user_account_no: 56789},
                   {amount : 700, user_name: "qwer", user_account_no: 8908}]);
        }, 1000);
      });

      setDepositTransactionsData(response);
      console.log("after set");
    };
    getDepositTransactions();

  }, []); 

  return (
    <div className="w-full lg:w-[40%] max-w-md block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-blue-800 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 border-blue-800 select-none">
        <FcCurrencyExchange className="mr-1" size={45} />
        <span> User List</span>
      </h3>

      {depositTransactionsList && depositTransactionsList.map((depositTransaction) => (
        <div>
          <p>
            User name: {depositTransaction.amount}
          </p>
          <p>
            User account no: {depositTransaction.user_name}
          </p>
          <p>
            Amount: {depositTransaction.user_account_no}
          </p>
          <br></br>

        </div>
      ))}
    </div>
  );
}

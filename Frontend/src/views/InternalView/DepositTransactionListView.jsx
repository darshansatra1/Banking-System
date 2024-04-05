import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import DepositCard from "../../components/shared/admin/DepositCard"; 


export default function DepositTransactionListview() {
  const [depositTransactionsList, setDepositTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        const response = await axios.get(`http://localhost:8080/${role}/deposit`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepositTransactionsData(response.data);
        console.log("Transaction data:", response.data);
      } else {
        console.error("Token not found in cookie");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
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
  
      const role = Cookies.get('role');
      const token = Cookies.get('token');
  
      if (!role || !token) {
        console.error("Role or token not found in cookie");
        navigate("/login");
        return;
      }
  
      const response = await axios.post(
        'http://localhost:8080/'+role+'/deposit/'+ depositId,
        { accept },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("done");
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
                <DepositCard
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
    );
  }
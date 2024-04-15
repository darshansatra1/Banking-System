import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import CustomerBillCard from "../../../components/Admin/CustomerBillCard";

export const CustomerBillListPage = () => {
    const navigate = useNavigate();
    const [billData, setBillData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        setLoading(true);
        setErrorMessage(''); 
        // Check if token exists
        if (user.token) {
            // Make API request to fetch customer bill list
            axios.get(`https://156.56.103.231:8080/${user.role}/bills`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Include token in the headers
                },
            })
            .then(response => {
              setBillData(response.data);
            })
            .catch(error => {
                setErrorMessage('An error occurred while fetching customer bill list. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            console.error('Token not found in cookies');
            setLoading(false);
        }
    }, []);  

    const onClick = async (bill_id) => {
        navigate(`${bill_id}`);
    };    

    return (
      <div>
          <div className="container mx-auto py-8">
              <div className="max-w block p-6 rounded shadow-lg shadow-black/20 bg-gray-800 mx-auto">
                  <div className="p-6">

                      <h3 className="flex justify-center items-center text-2xl text-blue-600 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 select-none">
                          <span>Bill List</span>
                      </h3>
                      {loading ? (
                          <p className="text-gray-100">Loading bill list...</p>
                      ) : errorMessage ? (
                          <p className="text-red-500">{errorMessage}</p>
                      ) : billData.length === 0 ? (
                          <p className="text-gray-100">No bills available.</p>
                      ) : (
                          <ul>
                              {billData && billData.map((bill) => (
                                  <CustomerBillCard
                                      bill_id={bill._id}
                                      status={bill.status}
                                      amount={bill.amount}
                                      merchant={bill.merchant}
                                      onClick={onClick}
                                  />
                              ))}
                          </ul>
                      )}
                  </div>
              </div>
          </div>
      </div>
    );
}

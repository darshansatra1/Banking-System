import React from 'react';

const CustomerBillCard = ({bill_id, status, amount, merchant, onClick}) => {
    const handlePayBill = async (e) => {
        e.preventDefault();
        await onClick(bill_id);
    }
    return (
        <div>
            <ul class="max-w divide-y divide-gray-200 dark:divide-gray-800">
                <li class="block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-white-100 hover:text-white-500 focus:bg-white-100 focus:text-white-500 focus:ring-0 dark:hover:bg-teal-900 dark:hover:text-white-200 dark:focus:bg-green-600 dark:focus:text-white-200">
                    <div
                        class="flex items-center space-x-4 rtl:space-x-reverse text-slate-900 group-hover:text-white text-sm">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full">
                            {/* <img class="w-8 h-8 rounded-full" src="" alt="Neil image"> */}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Merchant:</strong> {merchant}
                            </p>
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Amount:</strong> {amount}
                            </p>
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Status:</strong> {status}
                            </p>
                        </div>
                        {status == "pending" && (
                            <div>
                            <p><button type="button" 
                                    data-te-ripple-init 
                                    data-te-ripple-color="light" 
                                    onClick={handlePayBill}
                                    class="mb-6 inline-block w-full rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Pay Bill
                            </button></p>
                        </div>  
                        )}
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CustomerBillCard;
import React from 'react';

export const MerchantBillCard = ({ bill, index }) => {
  return (
    // <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
    //   <div className="bg-white rounded shadow-md p-6">
    //     <h3 className="text-xl font-bold mb-2">{bill.bill_number}</h3>
    //     <p className="text-gray-700 mb-4">Amount: {bill.amount}</p>
    //     <p className="text-gray-700 mb-4">Date: {bill.date_created}</p>
    //     <p className="text-gray-700 mb-4">Merchant: {bill.merchant}</p>
    //     <p className="text-gray-700 mb-4">Customer: {bill.customer}</p>
    //     <p className="text-gray-700 mb-4">Status: {bill.status}</p>
    //   </div>
    // </div>
    <div>
            <ul class="max-w divide-y divide-gray-200 dark:divide-gray-800">
                <li class="block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-white-100 focus:bg-white-100 focus:text-white-500 focus:ring-0 hover:bg-teal-900 dark:hover:text-white-200 dark:focus:bg-green-600 dark:focus:text-white-200">
                    <div
                        class="flex items-center space-x-4 rtl:space-x-reverse text-slate-900 group-hover:text-white text-sm">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full">
                            {/* <img class="w-8 h-8 rounded-full" src="" alt="Neil image"> */}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Customer:</strong> {bill.customer}
                            </p>
                            {/* <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Merchant:</strong> {bill.merchant}
                            </p> */}
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Date:</strong> {bill.date_created}
                            </p>
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Amount:</strong> {bill.amount}
                            </p>
                        </div>
                        <div
                            className={bill.status === 'complete' ? 'text-white bg-green-500 rounded-lg text-sm px-6 py-2.5 me-2 mb-2' : 'text-white bg-blue-700 rounded-lg text-sm px-6 py-2.5 me-2 mb-2'}
                            >
                            <strong >Status:</strong> {bill.status=== 'complete' ? "Paid" : "Pending"}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
  );
};

// export default BillCard;
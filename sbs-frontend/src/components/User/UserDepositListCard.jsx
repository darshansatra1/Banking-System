import React from 'react'

export const UserDepositListCard = ({deposit}) => {
  return (
    <div class="block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-white-100 hover:text-white-500 focus:bg-white-100 focus:.0text-white-500 focus:ring-0 dark:hover:bg-teal-900 dark:hover:text-white-200 dark:focus:bg-green-600 dark:focus:text-white-200">
        <div
            class="flex items-center space-x-4 rtl:space-x-reverse text-slate-900 group-hover:text-white text-sm">
            <div class="flex-shrink-0 w-8 h-8 rounded-full">
                {/* <img class="w-8 h-8 rounded-full" src="" alt="Neil image"> */}
            </div>
            <div class="flex-1 min-w-0">
                <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                    <strong>Amount: </strong> {deposit.amount}
                </p>
                <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                    <strong>Date Created: </strong> {deposit.date_created}
                </p>
            </div>
            <div
                className={deposit.status === 'accept' ? 'bg-green-500 text-white rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-green-500 focus:outline-none' 
                : deposit.status === 'waiting' ? 'text-white bg-blue-700 rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none' 
                : 'bg-red-500 text-white rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-red-500 focus:outline-none'}
                
                >
                <strong >Status:</strong> {deposit.status === 'accept' ? 'Success' : deposit.status === 'waiting' ? 'Pending' : 'Decline'}
            </div>
        </div>
    </div>
  )
}

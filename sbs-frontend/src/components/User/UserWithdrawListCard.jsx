import React from 'react'

export const UserWithdrawListCard = ({withdrawal}) => {
  return (
        <div className="block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-white-100 hover:text-white-500 focus:bg-white-100 focus:text-white-500 focus:ring-0 dark:hover:bg-teal-900 dark:hover:text-white-200 dark:focus:bg-green-600 dark:focus:text-white-200">
                                     
            <div
                class="flex items-center space-x-4 rtl:space-x-reverse text-slate-900 group-hover:text-white text-sm">
                <div class="flex-shrink-0 w-8 h-8 rounded-full">
                    {/* <img class="w-8 h-8 rounded-full" src="" alt="Neil image"> */}
                </div>
                <div class="flex-1 min-w-0">
                    <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                        <strong>Amount: </strong> {withdrawal.amount}
                    </p>
                    <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                        <strong>Date Created: </strong> {withdrawal.date_created}
                    </p>
                </div>
                <div
                    class="text-white bg-blue-700 rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
                    <strong>Status:</strong> {withdrawal.status}
                </div>
            </div>
        </div>
  )
}

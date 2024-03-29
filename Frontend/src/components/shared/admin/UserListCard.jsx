import React from 'react';

const UserListCard = ({user_name, email, balance, account_id,role,supervisor, manager, user_id, onClick}) => {

    const handleViewUser = async(e)=>{
        e.preventDefault();
        await onClick(user_id);
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
                                <strong>{user_name}</strong>
                            </p>
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Email:</strong> {email}
                            </p>
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Account ID:</strong> {account_id}
                            </p>
                            <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                <strong>Role:</strong> {role}
                            </p>
                            {supervisor && (
                                <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                    Supervisor: {supervisor}
                                </p>
                            )}
                            {manager && (
                                <p className="text-sm text-gray-100 truncate dark:text-gray-100">
                                    Manager: {manager}
                                </p>
                            )}
                        </div>
                        <div
                            class="text-white bg-blue-700 rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
                            <strong>Balance:</strong> ${balance}
                        </div>
                        <div>
                            <p><button type="button" 
                                    data-te-ripple-init 
                                    data-te-ripple-color="light" 
                                    onClick={handleViewUser}
                                    class="mb-6 inline-block w-full rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            View User
                            </button></p>
                        </div>     
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default UserListCard;
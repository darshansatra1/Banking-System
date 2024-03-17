import React from 'react';

const WithdrawCard = ({withdraw_id, user_name, client_id,amount, date_created,role,onClick}) => {

    const clickAccept = async(e)=>{
        e.preventDefault();
        await onClick(withdraw_id,true);
    }

    const clickDecline = async(e)=>{
        e.preventDefault();
        await onClick(withdraw_id,false);
    }

    return (
        <div>
            <div className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate dark:text-white">
                            {user_name}
                        </p>
                    </div>
                    <div
                        className="text-white bg-blue-700 rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">
                        ${amount}
                    </div>

                    <div>
                        <button onClick={clickAccept} type="button" data-te-ripple-init data-te-ripple-color="light"

                                className="mb-6 inline-block w-full rounded bg-[hsl(143,74%,45%)] px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Accept
                        </button>
                    </div>
                    <div>
                        <button onClick={clickDecline} type="button" data-te-ripple-init data-te-ripple-color="light"

                                className="mb-6 inline-block w-full rounded bg-[hsl(355,88,63)] px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[hsl(218,81%,75%)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawCard;
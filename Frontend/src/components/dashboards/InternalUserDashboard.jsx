import { FcCurrencyExchange } from "react-icons/fc";
import { Logo } from "../shared/Logo";
import React, { useState } from "react";

export default function InternalUserDashboard() {
  return (
    <div className="w-full lg:w-[40%] max-w-md block p-6 rounded shadow-lg shadow-black/20 bg-slate-50 mx-auto">
      <Logo />
      <h3 className="flex justify-center items-center text-2xl text-blue-800 font-bold text-center p-2 my-4 rounded shadow bg-blue-200 border-x-4 border-blue-800 select-none">
        <FcCurrencyExchange className="mr-1" size={45} />
        <span>Manager Dashboard</span>
      </h3>
    </div>
  );
}

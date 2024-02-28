import React from "react";
import Login from "../components/forms/userForms/Login";

export const UserLoginPage = () => {
  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto flex justify-center items-center flex-col lg:flex-row gap-4 p-4 md:p-10">
      <Login />
    </div>
  );
};

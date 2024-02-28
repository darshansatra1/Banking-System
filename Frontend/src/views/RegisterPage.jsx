import React from "react";
import Register from "../components/forms/userForms/Register";

export const RegisterPage = () => {

  return (
    <div className="min-h-screen max-w-4xl w-full mx-auto flex justify-center  items-center flex-col lg:flex-row gap-4 p-4 md:p-10">
      <Register className="w-full" />
    </div>
  );
};

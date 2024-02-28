import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminLoginPage } from "./views/admin/AdminLoginPage";
import { UserLoginPage } from "./views/user/UserLoginPage";
import { RegisterPage } from "./views/guest/RegisterPage";
import { Index } from "./components/home/Index";
import NotFoundPage from "./views/NotFound";
import { useEffect, useState } from "react";
import axios from 'axios'


function App() {

    //User And Admin Paths
    const paths = [
      "/profile",
      "/profile/:id",
      "/profile/:id/update",
      "/notifications",
      "/notifications/:id",
      "/account-request",
      "/account/in/:id",
      "/account/out/:id",
      "/account/withdraw/:id",
      "/account/transfer/:id",
      "/account/deposit/:id",
      "/account/deposit-logs/:id",
      "/account/withdraw-logs/:id",
      "/contact",
      "/admins/profile/:id",
      "/admins/profile/:id/update",
    ];
    
  return (
    <Router>
      {/* Guest Routes */}
      {/* {!user && !admin && ( */}
        <Routes>
          <Route index element={<Index />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/admins/login" element={<AdminLoginPage />} />
          <Route exact path="/login" element={<UserLoginPage />} />
          {paths.map((stringPath) => (
            <Route
              key={"Home"}
              exact
              path={stringPath}
              element={<Navigate to={"/"} />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      {/* // )} */}
    </Router>
  );
}

export default App;

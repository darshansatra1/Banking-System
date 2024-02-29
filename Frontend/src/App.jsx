import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserLoginPage } from "./views/UserLoginPage";
import { RegisterPage } from "./views/RegisterPage";
import { Index } from "./components/home/Index";
import NotFoundPage from "./views/NotFound";
import { useEffect, useState } from "react";
import axios from 'axios'
import InternalUserDashboard from "./components/dashboards/InternalUserDashboard";
import ExternalUserDashboard from "./components/dashboards/ExternalUserDashboard";
import ProfilePage from "./views/commonView/ProfilePage";
import DepositTransactionListview from "./views/internalUserview/DepositTransactionListView";



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
          <Route exact path="/login" element={<UserLoginPage />} />
          <Route exact path="/externalUserDashboard" element={<ExternalUserDashboard />} />
          <Route exact path="/internalUserDashboard" element={<InternalUserDashboard />} />
          <Route exact path="/profile" element={
                <InternalUserDashboard>
                  <ProfilePage />
                </InternalUserDashboard>
              } />
              <Route exact path="/depositTransactionListView" element={
                <InternalUserDashboard>
                  <DepositTransactionListview />
                </InternalUserDashboard>
            } />
 
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

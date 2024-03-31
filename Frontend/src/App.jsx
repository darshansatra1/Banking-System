import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import {UserLoginPage} from "./views/UserLoginPage";
import {RegisterPage} from "./views/RegisterPage";
import {Index} from "./components/home/Index";
import NotFoundPage from "./views/NotFound";
import {useEffect, useState} from "react";
import axios from 'axios'
import InternalUserDashboard from "./components/dashboards/InternalUserDashboard";
import ExternalUserDashboard from "./components/dashboards/ExternalUserDashboard";
import DepositTransactionListview from "./views/InternalView/DepositTransactionListView";

import WithdrawTransactionListview from "./views/InternalView/WithdrawTransactionListView";

import UserListView from "./views/InternalView/UserListView"; // Changed path
import MyProfilePage from "./views/ExternalView/MyProfilePage"; // Changed path
import DepositPage from "./views/ExternalView/DepositPage"; // Changed path
import WithdrawalPage from "./views/ExternalView/WithdrawalPage"; // Changed path
import DepositHistory from "./views/ExternalView/DepositHistory"; // Changed path
import WithdrawalHistory from "./views/ExternalView/WithdrawHistory"; // Changed path
import LogoutPage from "./views/ExternalView/LogoutPage"; // Changed path
import InternalProfilePage from "./views/InternalView/InternalProfilePage";
import InternalLogoutPage from "./views/InternalView/InternalLogoutPage";




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
                <Route index element={<Index/>}/>
                <Route exact path="/register" element={<RegisterPage/>}/>
                <Route exact path="/login" element={<UserLoginPage/>}/>
                <Route exact path="/externalUserDashboard" element={<ExternalUserDashboard/>}/>


        
                <Route exact path="/internalUserDashboard" element={<InternalUserDashboard/>}/>




                <Route exact path="/Internalprofile" element={

                    <InternalUserDashboard>
                        <InternalProfilePage/>
                    </InternalUserDashboard>}/>

                    
                <Route exact path="/userListView" element={

                    <InternalUserDashboard>
                        <UserListView/>
                    </InternalUserDashboard>}/>
                    
                <Route exact path="/depositTransactionListView" element={
                    <InternalUserDashboard>
                        <DepositTransactionListview/>
                    </InternalUserDashboard>}/>
                <Route exact path="/withdrawTransactionListView" element={
                    <InternalUserDashboard>
                        <WithdrawTransactionListview/>
                    </InternalUserDashboard>}/>

                    <Route exact path="/internallogout" element={
                    <InternalUserDashboard>
                        <InternalLogoutPage/>
                    </InternalUserDashboard>}/>




                   {/* External Dashboard */}


                <Route exact path="/profile" element={
                    <ExternalUserDashboard>
                        <MyProfilePage></MyProfilePage>
                    </ExternalUserDashboard>
                }/>




                <Route exact path="/deposit" element={
                    <ExternalUserDashboard>
                        <DepositPage></DepositPage>
                    </ExternalUserDashboard>
                }/>

                <Route exact path="/withdraw" element={
                    <ExternalUserDashboard>
                        <WithdrawalPage></WithdrawalPage>
                    </ExternalUserDashboard>
                }/>

                <Route exact path="/deposithistory" element={
                    <ExternalUserDashboard>
                        <DepositHistory></DepositHistory>
                    </ExternalUserDashboard>
                }/>

            <Route exact path="/withdrawhistory" element={
                                <ExternalUserDashboard>
                                    <WithdrawalHistory></WithdrawalHistory>
                                </ExternalUserDashboard>
                            }/>

<Route exact path="/logout" element={
                                <ExternalUserDashboard>
                                    <LogoutPage></LogoutPage>
                                </ExternalUserDashboard>
                            }/>
                {paths.map((stringPath) => (
                    <Route
                        key={"Home"}
                        exact
                        path={stringPath}
                        element={<Navigate to={"/"}/>}
                    />
                ))}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            {/* // )} */}
        </Router>
    );
}

export default App;

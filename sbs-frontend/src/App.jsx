import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage"; 
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { RegistrationPage } from "./pages/Registration/RegistrationPage";
import PageNotFound from "./pages/PageNotFound";
import { UserDashboard } from "./pages/User/UserDashboard";
import UserProfilePage from "./pages/User/Profile/UserProfilePage";
import { UserDepositPage } from "./pages/User/Deposit/UserDepositPage";
import { UserWithdrawPage } from "./pages/User/Withdraw/UserWithdrawPage";
import { UserDepositHistoryPage } from "./pages/User/Deposit/UserDepositHistoryPage";
import { UserWithdrawHistoryPage } from "./pages/User/Withdraw/UserWithdrawHistoryPage";
import { UserLogoutPage } from "./pages/User/Logout/UserLogoutPage";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { AdminProfilePage } from "./pages/Admin/Profile/AdminProfilePage";
import { AdminUserListPage } from "./pages/Admin/Users/AdminUserListPage";
import { AdminDepositTransactionPage } from "./pages/Admin/Deposit/AdminDepositTransactionPage";
import { AdminWithdrawTransactionPage } from "./pages/Admin/Withdraw/AdminWithdrawTransactionPage";
import { AdminLogoutPage } from "./pages/Admin/Logout/AdminLogoutPage";
import { AdminUserProfilePage } from "./pages/Admin/Users/AdminUserProfilePage";
import { AdminUserDepositHistoryPage } from "./pages/Admin/Users/AdminUserDepositHistoryPage";
import { AdminUserWithdrawHistoryPage } from "./pages/Admin/Users/AdminUserWithdrawHistoryPage";
import { AdminUserNavigationPage } from "./pages/Admin/Users/AdminUserNavigationPage";
import CreateBill from "./pages/User/Create Bill/CreateBill";
import BillHistory from "./pages/User/Create Bill/BillHistory";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/> 
        <Route path="register" element={<RegistrationPage/>}/> 

        <Route path="user" element={<ProtectedRoute children={<UserDashboard/>}/>}>
          <Route index element={<UserProfilePage/>} /> 
          <Route path="profile" element={<UserProfilePage/>} /> 
          <Route path="deposit" element={<UserDepositPage/>} /> 
          <Route path="withdraw" element={<UserWithdrawPage/>} /> 
          <Route path="createbill" element={<CreateBill/>} /> 
          <Route path="bill_history" element={<BillHistory/>} /> 
          <Route path="deposit_history" element={<UserDepositHistoryPage/>} /> 
          <Route path="withdraw_history" element={<UserWithdrawHistoryPage/>} /> 
          <Route path="logout" element={<UserLogoutPage/>} /> 
        </Route>

        <Route path="admin" element={<ProtectedRoute children={<AdminDashboard/>}/>}>
          <Route index element={<AdminProfilePage/>} />
          <Route path="profile" element={<AdminProfilePage/>} />
          <Route path="users" element={<AdminUserListPage/>} />
          <Route path="depositTransactions" element={<AdminDepositTransactionPage/>} />
          <Route path="withdrawTransactions" element={<AdminWithdrawTransactionPage/>} />
          <Route path="users/:userId/:userRole" element={<AdminUserNavigationPage/>} />
          <Route path="users/:userId/:userRole/profile" element={<AdminUserProfilePage/>} />
          <Route path="users/:userId/:userRole/deposit" element={<AdminUserDepositHistoryPage/>} />
          <Route path="users/:userId/:userRole/withdraw" element={<AdminUserWithdrawHistoryPage/>} />
          <Route path="logout" element={<AdminLogoutPage/>} />
        </Route>


        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;

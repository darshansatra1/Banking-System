import {Routes, Route} from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage"; 
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { RegistrationPage } from "./pages/Registration/RegistrationPage";
import PageNotFound from "./pages/PageNotFound";
import { UserDashboard } from "./pages/User/UserDashboard";
import { UserProfilePage } from "./pages/User/Profile/UserProfilePage";
import { UserDepositPage } from "./pages/User/Deposit/UserDepositPage";
import { UserWithdrawPage } from "./pages/User/Withdraw/UserWithdrawPage";
import { UserDepositHistoryPage } from "./pages/User/Deposit/UserDepositHistoryPage";
import { UserWithdrawHistoryPage } from "./pages/User/Withdraw/UserWithdrawHistoryPage";


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
          <Route path="deposit_history" element={<UserDepositHistoryPage/>} /> 
          <Route path="withdraw_history" element={<UserWithdrawHistoryPage/>} /> 
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;

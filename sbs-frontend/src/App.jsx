import {Routes, Route} from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage"; 
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { RegistrationPage } from "./pages/Registration/RegistrationPage";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/register" element={<RegistrationPage/>}/> 
      </Routes>
    </AuthProvider>
  );
}

export default App;

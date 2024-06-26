// AuthProvider.js
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const encryptionKey = "7FQJWPkf7efdxsiTcCTUzfTkibXvCg6fpmmqHpMckqB"



    const [user, setUser] = useLocalStorage("user", null, encryptionKey);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        setUser(data);
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

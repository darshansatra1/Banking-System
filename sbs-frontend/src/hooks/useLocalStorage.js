// useLocalStorage.js
import { useState } from "react";
import CryptoJS from "crypto-js";

export const useLocalStorage = (keyName, defaultValue, encryptionKey) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                // Decrypt the stored value
                const decryptedValue = CryptoJS.AES.decrypt(value, encryptionKey).toString(CryptoJS.enc.Utf8);
                return JSON.parse(decryptedValue);
            }
            return {}
        } catch (err) {
            console.error("Error handling localStorage:", err);
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            if (newValue) {
                // Encrypt the new value and store it
                const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(newValue), encryptionKey).toString();
                window.localStorage.setItem(keyName, encryptedValue);
                setStoredValue(newValue); // Update the state with the new value
            } else {
                // If no new value is provided, clear the stored value from localStorage
                window.localStorage.removeItem(keyName);
                setStoredValue(defaultValue); // Update the state with the default value
            }
        } catch (err) {
            console.error("Error setting localStorage value:", err);
        }
    };
    
    return [storedValue, setValue];
};

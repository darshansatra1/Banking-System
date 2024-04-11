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
            // Encrypt and store the new value
            const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(newValue), encryptionKey).toString();
            window.localStorage.setItem(keyName, encryptedValue);
        } catch (err) {
            console.error("Error setting localStorage value:", err);
        }
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};

import React from "react";
import ReactDOM  from "react-dom/client";
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import "./assets/styles/App.css";
import "./assets/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
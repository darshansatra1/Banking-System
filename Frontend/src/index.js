// import React from "react";
// import ReactDOM  from "react-dom/client";
// import App from './App';

// //
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './reducers';
// //

// import 'react-toastify/dist/ReactToastify.css'
// import "./assets/styles/App.css";
// import "./assets/styles/index.css";

// const root = ReactDOM.createRoot(document.getElementById('root'));

// //
// const store = createStore(rootReducer);
// //

// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/App.css";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

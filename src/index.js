import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
//import {createRoot} from 'react- dom/client';
import App from './App';
//mport { BrowserRouter, Router, Route, Routes } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./components/pages/AuthContext";
import { ChatContextProvider } from "./components/pages/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Navigation from "./Navigation/Navigation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
    <ToastContainer />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);

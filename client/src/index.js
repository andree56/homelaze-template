import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthProvider } from "contexts/AuthContext";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

// Configure Axios to include the token in every request
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Optional: Redirect to login on 401 Unauthorized responses
axios.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    window.location = '/auth/login'; // Adjust as needed
  }
  return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="*" element={<Navigate to="/admin/index" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

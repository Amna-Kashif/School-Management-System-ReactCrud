import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard";

const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (role && role !== userRole && userRole !== "admin") return <Navigate to="/home" />;
  return children;
};


const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  // const role = localStorage.getItem("role");

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/dashboard" element={
          <PrivateRoute role="admin">
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
      </Routes>
      {isLoggedIn && <Footer />}
    </>
  );
};

export default App;

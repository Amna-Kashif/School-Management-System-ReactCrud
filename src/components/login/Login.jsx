import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) return alert("Select role!");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === email && u.password === password && u.role === role);

    if (found) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);
      if (role === "admin") navigate("/dashboard");
      else navigate("/home");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleLogin}>
          <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select mb-2">
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <button className="btn btn-success w-100">Login</button>
        </form>
        <div>
        <p>Already have an account</p>
        <a href="/">signup</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

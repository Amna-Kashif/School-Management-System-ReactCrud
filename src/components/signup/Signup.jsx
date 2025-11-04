import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "", email: "", password: "", grade: "", role: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, role } = user;
    if (!fullName || !email || !password || !role) {
      alert("Please fill all fields and select role!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      alert("Email already registered!");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Login now.");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Signup</h3>
        <form onSubmit={handleSubmit}>
          <input
            id="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            id="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            id="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <select
            id="role"
            value={user.role}
            onChange={handleChange}
            className="form-select mb-3"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <button className="btn btn-success w-100">Signup</button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">Already have an account?</p>
          <button
            className="btn btn-link p-0 text-decoration-none"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [mode, setMode] = useState("login"); // login | register

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    const saved = JSON.parse(localStorage.getItem("adminUser"));
  
    if (!saved) {
      alert("No admin registered yet");
      return;
    }
  
    if (
      email.trim().toLowerCase() === saved.email &&
      password.trim() === saved.password
    ) {
      localStorage.setItem("isAdmin", "true"); // 🔐 session flag
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
  
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
  
    const newAdmin = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };
  
    localStorage.setItem("adminUser", JSON.stringify(newAdmin));
  
    alert("Admin registered successfully");
    setMode("login");
  };

  return (
    <div className="admin-landing">

      <div className="admin-hero">
        <h1>Admin Portal</h1>
        <p>Secure access to Reasty dashboard</p>

        <div className="auth-toggle">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <form className="admin-card" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="admin-card" onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button type="submit">Register</button>
          </form>
        )}
      </div>

    </div>
  );
}
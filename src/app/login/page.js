"use client";
import { useState } from "react";
import "./login.css";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("Login success.");
      //window.location.href = "/dashboard";
    }
  };

  return (
    <div className="loginContainer">
      <h2 className="formTitle">Login</h2>
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="text"
          className="inputField"
          placeholder="Username"
          value={form.email}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          className="inputField"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="submitButton">
          Login
        </button>
      </form>
      {message && (
        <div
          className={`messageContainer ${
            message === "Login success."
              ? "successContainer"
              : "errorContainer"
          }`}
        >
          <p
            className={`message ${
              message === "Login success." ? "success" : "error"
            }`}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

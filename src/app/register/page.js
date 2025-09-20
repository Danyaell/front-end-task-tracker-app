"use client";
import { useState } from "react";
import "./register.css";
import { registerUserService } from "@/api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUserService(form);
    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("User registered successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  };

  return (
    <div className="registerContainer">
      <h2 className="formTitle">Register</h2>
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="text"
          className="inputField"
          placeholder="Username"
          value={form.username}
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
        <select
          className="inputField"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="">Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="submitButton">
          Sign up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

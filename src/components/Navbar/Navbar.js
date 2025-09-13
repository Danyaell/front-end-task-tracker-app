"use client";
import { useAuth } from "@/context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <nav>
        <span className="navButton">Loading...</span>
      </nav>
    );
  }

  return (
    <nav>
      <a href="/" className="navButton">
        Home
      </a>
      {!isAuthenticated && (
        <>
          <a href="/login" className="navButton">
            Login
          </a>
          <a href="/register" className="navButton">
            Register
          </a>
        </>
      )}
      {isAuthenticated && (
        <>
          <a href="/dashboard" className="navButton">
            Dashboard
          </a>
          {isAdmin && (
            <a href="/admin" className="navButton">
              Admin
            </a>
          )}
          <button onClick={logout} className="navButton">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

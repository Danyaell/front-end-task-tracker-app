"use client";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <nav>
      <a href="/" className="navButton">
        Home
      </a>
      <a href="/login" className="navButton">
        Login
      </a>
      <a href="/register" className="navButton">
        Register
      </a>
      {isAuthenticated && (
        <>
          <a href="/dashboard" className="navButton">
            Dashboard
          </a>
          {isAdmin && <a href="/admin">Admin</a>}
        </>
      )}
    </nav>
  );
}

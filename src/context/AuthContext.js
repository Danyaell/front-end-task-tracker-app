"use client";
import {
  getCurrentUserService,
  loginUserService,
  registerUserService,
} from "@/api/auth";
import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case "LOADING_DONE":
      return { ...state, loading: false };
    default:
      return state;
  }
}

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return { error: e.message || "Invalid token." };
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const isAdmin = state.user?.role === "admin";

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (token && !isTokenExpired(token)) {
        const res = await getCurrentUserService();
        if (!res.error) {
          dispatch({ type: "LOGIN_SUCCESS", payload: { user: res.user, token } });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }
    loadUser();
  }, []);

  const login = async (credentials) => {
    const data = await loginUserService(credentials);
    if (!data.error && data.token) {
      localStorage.setItem("token", data.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: data.user || null, token: data.token },
      });
    }
    return data;
  };

  const register = async (formData) => {
    const data = await registerUserService(formData);
    return data;
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

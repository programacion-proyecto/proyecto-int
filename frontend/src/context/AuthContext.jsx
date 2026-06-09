import { createContext, useContext, useEffect, useState } from "react";

export const ACCOUNTS = [
  { email: "admin@logistics.com", password: "admin123", role: "admin", name: "Admin User" },
  { email: "operario@logistics.com", password: "operario123", role: "operario", name: "Operario" },
];

const AUTH_KEY = "logistics_auth";
const ROLE_KEY = "logistics_role";
const NAME_KEY = "logistics_name";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ authed: null, role: null, name: "" });

  useEffect(() => {
    const authed = localStorage.getItem(AUTH_KEY) === "1";
    setState({
      authed,
      role: authed ? localStorage.getItem(ROLE_KEY) : null,
      name: authed ? localStorage.getItem(NAME_KEY) || "" : "",
    });
  }, []);

  const login = (email, password) => {
    const acc = ACCOUNTS.find((a) => a.email === email.trim() && a.password === password);
    if (!acc) return null;
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(ROLE_KEY, acc.role);
    localStorage.setItem(NAME_KEY, acc.name);
    setState({ authed: true, role: acc.role, name: acc.name });
    return acc.role;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(NAME_KEY);
    setState({ authed: false, role: null, name: "" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
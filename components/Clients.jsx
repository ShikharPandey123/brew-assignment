"use client";

import Link from "next/link";
import { useState, useEffect, createContext, useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export const Context = createContext({
  user: null,
  setUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Context.Provider value={{ user, setUser, loading }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");

      if (!data.success) {
        toast.error(data.error || data.message);
        return;
      }

      setUser(null);
      toast.success("Logged out");
      router.push("/login");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Logout failed");
    }
  };

  if (!user) return <Link href="/login">Login</Link>;

  return (
    <button onClick={logoutHandler} className="logout-btn">
      Logout
    </button>
  );
};

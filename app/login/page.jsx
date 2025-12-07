"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const { user, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (!data.success) {
        return toast.error(data.error || data.message);
      }

      setUser(data.user);
      toast.success("Logged in");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  if (user) return redirect("/");

  return (
    <div className="login">
      <h2>Login</h2>

      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="extra-links">
          <p>
            New here? <Link href="/register">Create an account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

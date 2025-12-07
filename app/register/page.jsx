"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const { user, setUser } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (!data.success) {
        return toast.error(data.error || data.message);
      }

      setUser(data.user);
      toast.success("Account created");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
    }
  };

  if (user) return redirect("/");

  return (
    <div className="login">
      <h2>Sign Up</h2>

      <form onSubmit={registerHandler}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Create Account</button>

        <div className="extra-links">
          <p>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

"use client";

import "../../styles/login.scss";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../components/Clients";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const RegisterPage = () => {
  const { user, setUser, loading } = useContext(Context);
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (!data.success) {
        toast.error(data.error || data.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      setUser(data.user);
      toast.success("Account created successfully! 🎉");
      setName("");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (loading) return null;
  if (user) return null;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder="Type your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-with-icon">
              <span className="icon">✉️</span>
              <input
                type="email"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="Type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "SIGN UP"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Or Sign In Using <Link href="/login">LOGIN</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

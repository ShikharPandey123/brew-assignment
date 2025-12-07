"use client";

import "../../styles/login.scss";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../components/Clients";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const { user, setUser, loading } = useContext(Context);
  const router = useRouter();
  
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
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (!data.success) {
        toast.error(data.error || data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      setUser(data.user);
      toast.success("Logged in successfully! 🎉");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (loading) return null;
  if (user) return null;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <span className="icon">👤</span>
              <input
                type="email"
                placeholder="Type your username"
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
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "LOGIN"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Or Sign Up Using <Link href="/register">SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

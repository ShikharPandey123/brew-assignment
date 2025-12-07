"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { LogoutBtn } from "../components/Clients";
import { Context } from "../components/Clients";

const Header = () => {
  const { user } = useContext(Context);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          TaskTrackr
        </Link>

        {/* Center Navigation */}
        <nav className="navbar-nav">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
        </nav>

        {/* Right Action */}
        <div className="navbar-action">
          {user ? <LogoutBtn /> : <Link href="/login" className="login-link">Login</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;

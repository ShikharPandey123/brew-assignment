"use client";

import { useContext } from "react";
import { Context } from "../../components/Clients";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { user, loading } = useContext(Context);

  if (loading) return null; 

  if (!user) return redirect("/login");

  return (
    <div className="container" style={{ maxWidth: "480px" }}>
      <h2 style={{ marginBottom: "1rem" }}>Profile</h2>

      <div
        style={{
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
      >
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

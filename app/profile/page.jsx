"use client";

import { useContext, useEffect } from "react";
import { Context } from "../../components/Clients";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, loading } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "3rem 2rem",
          borderRadius: "20px 20px 0 0",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            color: "#fff",
            fontWeight: "700",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: "700", margin: "0" }}>
          {user.name}
        </h2>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1.2rem",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            borderRadius: "12px",
            borderLeft: "4px solid #667eea",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "#718096", marginBottom: "0.5rem", fontWeight: "600" }}>
            Full Name
          </p>
          <p style={{ fontSize: "1.1rem", color: "#2d3748", fontWeight: "600" }}>
            {user.name}
          </p>
        </div>

        <div
          style={{
            padding: "1.2rem",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            borderRadius: "12px",
            borderLeft: "4px solid #764ba2",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "#718096", marginBottom: "0.5rem", fontWeight: "600" }}>
            Email Address
          </p>
          <p style={{ fontSize: "1.1rem", color: "#2d3748", fontWeight: "600" }}>
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "tasktracker",
  });
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export const cookieSetter = (res, token, enabled = true) => {
  const cookie = serialize("token", enabled ? token : "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: enabled ? 15 * 24 * 60 * 60 : 0,
  });

  res.setHeader("Set-Cookie", cookie);
};

export const checkAuth = async (req) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    return user || null;
  } catch {
    return null;
  }
};

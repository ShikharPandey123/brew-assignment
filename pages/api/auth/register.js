import bcrypt from "bcrypt";
import { User } from "../../../models/user";
import { connectDB } from "../../../utils/features";
import { asyncError, errorHandler } from "../../../middlewares/error";
import { cookieSetter, generateToken } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 405, "Method Not Allowed");
  }

  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return errorHandler(res, 400, "All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return errorHandler(res, 400, "Invalid email format");
  }
  if (password.length < 6) {
    return errorHandler(res, 400, "Password must be at least 6 characters");
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorHandler(res, 409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  const token = generateToken(newUser._id);
  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

export default handler;

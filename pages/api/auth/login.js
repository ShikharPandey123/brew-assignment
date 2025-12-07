import bcrypt from "bcrypt";
import { User } from "../../../models/user";
import { connectDB } from "../../../utils/features";
import { asyncError, errorHandler } from "../../../middlewares/error";
import { cookieSetter, generateToken } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 405, "Method Not Allowed");
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return errorHandler(res, 400, "Email and password are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return errorHandler(res, 400, "Invalid email format");
  }

  if (password.length < 6) {
    return errorHandler(res, 400, "Password must be at least 6 characters");
  }

  await connectDB();

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return errorHandler(res, 401, "Incorrect email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return errorHandler(res, 401, "Incorrect email or password");
  }
  const token = generateToken(user._id);

  cookieSetter(res, token, true);
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default handler;

import { asyncError, errorHandler } from "../../../middlewares/error";
import { checkAuth } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 405, "Method Not Allowed");
  }
  const user = await checkAuth(req);

  if (!user) {
    return errorHandler(res, 401, "Authentication required");
  }
  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default handler;

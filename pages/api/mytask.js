import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middlewares/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") {
    return errorHandler(res, 405, "Method Not Allowed");
  }

  await connectDB();

  const user = await checkAuth(req);
  if (!user) {
    return errorHandler(res, 401, "Authentication required");
  }

  const { status, search } = req.query;
  const query = { user: user._id };
  if (status && ["todo", "in-progress", "done"].includes(status)) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const tasks = await Task.find(query)
    .sort({ dueDate: 1, createdAt: -1 })
    .select("-__v");

  return res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

export default handler;

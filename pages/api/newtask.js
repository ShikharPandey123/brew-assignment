import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middlewares/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 405, "Method Not Allowed");
  }

  await connectDB();

  const user = await checkAuth(req);
  if (!user) {
    return errorHandler(res, 401, "Authentication required");
  }

  const { title, description, dueDate, priority, status } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return errorHandler(res, 400, "Title is required");
  }

  if (priority && !["low", "medium", "high"].includes(priority)) {
    return errorHandler(res, 400, "Invalid priority value");
  }

  if (status && !["todo", "in-progress", "done"].includes(status)) {
    return errorHandler(res, 400, "Invalid status value");
  }

  const newTask = await Task.create({
    title: title.trim(),
    description: description || "",
    dueDate: dueDate ? new Date(dueDate) : null,
    priority: priority || "medium",
    status: status || "todo",
    user: user._id,
  });

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    task: newTask,
  });
});

export default handler;

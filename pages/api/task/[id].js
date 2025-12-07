import { checkAuth, connectDB } from "../../../utils/features";
import { Task } from "../../../models/task";
import { asyncError, errorHandler } from "../../../middlewares/error";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login First");

  const taskId = req.query.id;

  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 404, "Task not found");

  if (task.user.toString() !== user._id.toString()) {
    return errorHandler(res, 403, "Not authorized");
  }

  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      task,
    });
  }

  if (req.method === "PUT") {
    const { title, description, status, priority, dueDate } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  }

  if (req.method === "DELETE") {
    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  }

  return errorHandler(res, 405, "Method not allowed");
});

export default handler;

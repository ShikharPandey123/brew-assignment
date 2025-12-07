"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const TaskCard = ({ task }) => {
  const router = useRouter();

  const deleteTask = async () => {
    try {
      const res = await fetch(`/api/task/${task._id}`, { method: "DELETE" });
      const data = await res.json();

      if (!data.success) return toast.error(data.error || data.message);

      toast.success("Task deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="task-card">
      <div className="task-title">{task.title}</div>

      {task.description && (
        <div className="task-description">{task.description}</div>
      )}

      <div className="meta-row">
        <span className={`badge status-${task.status}`}>{task.status}</span>
        <span className={`badge priority-${task.priority}`}>
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="actions">
        <Link href={`/edit/${task._id}`}>
          <button className="edit-btn">Edit</button>
        </Link>

        <button className="delete-btn" onClick={deleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

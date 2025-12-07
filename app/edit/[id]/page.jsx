"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditTaskPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`/api/task/${id}`);
      const data = res.data;

      if (!data.success) {
        toast.error(data.error || data.message);
        return;
      }

      const task = data.task;

      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "medium");
      setStatus(task.status || "todo");
      setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : "");
    } catch (err) {
      toast.error("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/task/${id}`, {
        title,
        description,
        priority,
        status,
        dueDate: dueDate || null,
      });

      if (!data.success) {
        return toast.error(data.error || data.message);
      }

      toast.success("Task updated");
      router.push("/todos");
      router.refresh();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="task-form container">
      <h2>Edit Task</h2>

      <form onSubmit={updateHandler}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskPage;

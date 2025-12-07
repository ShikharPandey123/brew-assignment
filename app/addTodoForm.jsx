"use client";

import { useState, useContext, useEffect } from "react";
import { Context } from "../components/Clients";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddTodoForm = () => {
  const { user, loading } = useContext(Context);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/newtask", {
        title,
        description,
        priority,
        status,
        dueDate: dueDate || null,
      });

      if (!data.success) {
        return toast.error(data.error || data.message);
      }

      toast.success("Task created");

      // reset
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("todo");
      setDueDate("");

      router.refresh();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create task");
    }
  };

  return (
    <div className="task-form container">
      <h2>✨ Create New Task</h2>

      <form onSubmit={submitHandler}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows={4}
            placeholder="Describe your task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">📋 To Do</option>
              <option value="in-progress">⏳ In Progress</option>
              <option value="done">✅ Done</option>
            </select>
          </div>
        </div>

        <div>
          <label>Due Date (Optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit">🚀 Create Task</button>
      </form>
    </div>
  );
};

export default AddTodoForm;

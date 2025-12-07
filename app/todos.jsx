import { cookies } from "next/headers";
import  TaskCard  from "../components/TaskCard";

const fetchTasks = async (token) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-store",
      headers: {
        cookie: `token=${token}`,
      },
    });

    const data = await res.json();
    if (!data.success) return [];

    return data.tasks;
  } catch {
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  const tasks = await fetchTasks(token);

  return (
    <section className="tasks-list container">
      {tasks.length === 0 ? (
        <div 
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📝</div>
          <h3 style={{ 
            fontSize: "1.5rem", 
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            No Tasks Yet
          </h3>
          <p style={{ color: "#718096", fontSize: "1rem" }}>
            Create your first task to get started!
          </p>
        </div>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </section>
  );
};

export default Todos;

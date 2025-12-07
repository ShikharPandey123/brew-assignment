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
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </section>
  );
};

export default Todos;

import React, { Suspense } from "react";
import Form from "../addTodoForm";
import Todos from "../todos";

const TodosPage = async () => {
  return (
    <div>
      <div 
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "3rem 2rem",
          textAlign: "center",
          marginBottom: "2rem",
          borderRadius: "0 0 30px 30px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)"
        }}
      >
        <h1 
          style={{
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
          }}
        >
          Your Tasks
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.1rem" }}>
          Manage and track all your tasks in one place
        </p>
      </div>
      
      <Form />

      <Suspense fallback={
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      }>
        <Todos />
      </Suspense>
    </div>
  );
};

export default TodosPage;

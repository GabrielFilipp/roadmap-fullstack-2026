"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/hooks/useTaskStore";
import Title from "@/components/atoms/Title";
import TaskForm from "@/components/atoms/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";

export default function Home() {
  const {
    tasks,
    loading,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
    clearAll,
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <main style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <Title>Roadmap Full Stack 2026</Title>

      <TaskForm onAddTask={addTask} />
      {loading ? (
        <p> Loading tasks from server </p>
      ) : (
        <TaskList
          tasks={tasks}
          onRemoveTask={removeTask}
          onToggleTask={toggleTask}
        />
      )}

      {tasks.length > 0 && (
        <button
          onClick={clearAll}
          style={{
            marginTop: "20px",
            color: "red",
            cursor: "pointer",
            border: "none",
            background: "none",
          }}
        >
          Clear All Tasks
        </button>
      )}
    </main>
  );
}

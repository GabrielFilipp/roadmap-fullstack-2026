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
    <main className={`max-w-2xl mx-auto p-8 space-y-8`}>
      <header>
        <Title>Roadmap Full Stack 2026</Title>
        <p className={`text-gray-500 mt-2`}>
          Gerencie suas metas diárias de evolução.{" "}
        </p>
      </header>

      <TaskForm onAddTask={addTask} />

      {loading ? (
        <div
          className={`animate-pulse text-center p-10 text-blue-600 font-medium`}
        >
          Carregando tarefas sincronizadas...
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onRemoveTask={removeTask}
          onToggleTask={toggleTask}
          onClearAll={clearAll}
        />
      )}
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import Title from "@/components/atoms/Title";
import TaskForm from "@/components/atoms/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const API_URL = "http://localhost:3001/tasks";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(`Error fetching tasks: ${error}`);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(`Error adding task: ${error}`);
    }
  };

  const removeTask = async (idToRemove) => {
    try {
      await fetch(`${API_URL}/${idToRemove}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== idToRemove));
    } catch (error) {
      console.log(`Error removing task: ${error}`);
    }
  };

  const clearAllTasks = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "DELETE",
      });
      response.ok ? setTasks([]) : ""; // Limpa todas as tarefas
    } catch (error) {
      console.error(`Error clearing tasks in database: ${error}`);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
      });
      const updatedTasks = await response.json();

      setTasks(tasks.map((t) => (t.id === id ? updatedTasks : t)));
    } catch (error) {
      console.error(`Error toggling task: ${error}`);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Title>Roadmap Full Stack 2026</Title>
      <p>Bem-vindo à faze de Componentização Atômica</p>
      <Title nivel={2}>O que é Componentização Atômica?</Title>
      {/*Passa a função addTask como prop para o componente TaskForm*/}
      <TaskForm onAddTask={addTask} />
      <section style={{ marginTop: "20px" }}>
        <Title nivel={2}>Tarefas</Title>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
              }}
            >
              {task.text}
            </li>
          ))}
        </ul>

        {/*Passa as funções removeTask e clearAllTasks como props para o componente TaskList*/}
        <TaskList
          tasks={tasks}
          onRemoveTask={removeTask}
          onToggleTask={toggleTask}
          onClearAll={clearAllTasks}
        />
      </section>
    </main>
  );
}

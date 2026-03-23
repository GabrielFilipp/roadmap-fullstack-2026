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

  const removeTask = (idToRemove) => {
    setTasks(tasks.filter((task) => task.id !== idToRemove));
  };

  const clearAllTasks = () => {
    setTasks([]); // Limpa todas as tarefas
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
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
          onToggleTask={() => {}}
          onClearAll={clearAllTasks}
        />
      </section>
    </main>
  );
}

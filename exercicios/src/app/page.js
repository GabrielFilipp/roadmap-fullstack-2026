"use client";

import { useState } from "react";
import Title from "@/components/atoms/Title";
import TaskForm from "@/components/atoms/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Configurar Ambiente Ágil", completed: false },
    { id: 2, text: "Estudar Atomic Design", completed: false },
  ]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]); // Atualiza o estado com a nova tarefa adicionada
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
          onToggleTask={toggleTask}
          onClearAll={clearAllTasks}
        />
      </section>
    </main>
  );
}

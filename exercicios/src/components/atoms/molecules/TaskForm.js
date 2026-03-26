import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

export default function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleAdd = () => {
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  };

  return (
    <div
      className={`flex gap-2 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100`}
    >
      <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Digite uma nova tarefa"
        onKeyDown={(e) => {
          e.key === "Enter" && handleAdd();
        }}
      />
      <Button onClick={handleAdd}>Adicionar</Button>
    </div>
  );
}

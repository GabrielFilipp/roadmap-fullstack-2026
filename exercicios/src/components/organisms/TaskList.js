import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";

export default function TaskList({
  tasks,
  onRemoveTask,
  onToggleTask,
  onClearAll,
}) {
  return (
    <section style={{ marginTop: "30px", width: "100%" }}>
      <Title nivel={2}>Suas Tarefas</Title>

      {tasks.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>
          Nenhuma tarefa adicionada ainda. Adicione uma nova tarefa!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                onClick={() => onToggleTask(task.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#aaa" : "#333",
                }}
              >
                {task.text}
              </span>
              <Button variant="danger" onClick={() => onRemoveTask(task.id)}>
                Remover
              </Button>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Button variant="danger" onClick={onClearAll}>
            Excluir todas as tarefas
          </Button>
        </div>
      )}
    </section>
  );
}

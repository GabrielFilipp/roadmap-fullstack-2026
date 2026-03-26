import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";

export default function TaskList({
  tasks,
  onRemoveTask,
  onToggleTask,
  onClearAll,
  title = "Minhas Tarefas",
}) {
  return (
    <section
      className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden`}
    >
      <header
        className={`px-6 py-4 border-bottom bg-gray-50 flex justify-between items-center`}
      >
        <Title nivel={2}>{title}</Title>
        <span
          className={`text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full `}
        >
          {tasks.length} {tasks.length === 1 ? "Tarefa" : "Tarefas"}
        </span>
      </header>

      <ul className={`divide-y divide-gray-100`}>
        {tasks.length === 0 ? (
          <li className={`p-10 text-center text-gray-400 italic`}>
            Nenhuma Tarefa Encontrada. Adicione uma nova tarefa!
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 hover:bg-blue-50/30 transition-colors group`}
            >
              <div className={`flex items-center gap-3`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className={`w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer`}
                />
                <span
                  className={`text-lg transition-all ${task.completed ? "line-through text-gray-300" : "text-gray-700"}`}
                >
                  {" "}
                  {task.text}
                </span>
              </div>
              <Button variant="danger" onClick={() => onRemoveTask(task.id)}>
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {tasks.length > 0 && (
        <footer
          className={`px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end`}
        >
          <Button variant="danger" onClick={onClearAll}>
            Excluir todas as tarefas
          </Button>
        </footer>
      )}
    </section>
  );
}

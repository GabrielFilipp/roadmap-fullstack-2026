import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: "Complete Sprint 1", completed: true },
  { id: 2, text: "Setup Node.js Server", completed: false },
];

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
  const { text } = req.body;
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`API Server running on http://localhost:${PORT}`),
);

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: { text, completed: false },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: "Failed to create task" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const currentTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { completed: !currentTask.completed },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: "Failed to toggle task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete task" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`API Server running on http://localhost:${PORT}`),
);

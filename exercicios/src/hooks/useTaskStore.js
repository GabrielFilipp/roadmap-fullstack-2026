import { create } from "zustand";

const API_URL = "http://localhost:3001/tasks";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,

  // Action: Get Tasks  to server (GET)
  fetchTasks: async () => {
    set({ loading: true });

    // Simulates a 2-second delay for visual testing.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      set({ tasks: data, loading: false });
    } catch (error) {
      console.error(`Failed to fetch tasks: ${error}`);
      set({ loading: false });
    }
  },

  //Action: Add Task
  addTask: async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error(`Failed to add tasks: ${error}`);
    }
  },

  //Action: Alter Status (PATCH)
  toggleTask: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "PATCH" });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
    } catch (error) {
      console.error(`Error toggling task: ${error}`);
    }
  },

  //Action: Remove Task (DELETE)
  removeTask: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    } catch (error) {
      console.error(`Error removing task: ${error}`);
    }
  },

  //Action: All Clear (DELETE ALL)
  clearAll: async () => {
    try {
      await fetch(API_URL, { method: "DELETE" });
      set({ tasks: [] });
    } catch (error) {
      console.error(`Error clearing tasks: ${error}`);
    }
  },
}));

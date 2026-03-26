import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTaskStore } from "@/hooks/useTaskStore";

describe("useTaskStore", () => {
  //limpa o estado antes de cada teste
  beforeEach(() => {
    const { clearAll } = useTaskStore.getState();
    useTaskStore.setState({ tasks: [] });
  });

  it("should start with an empty task list", () => {
    const { tasks } = useTaskStore.getState();
    expect(tasks).toEqual([]);
  });

  it("should add a task locally (logic check)", () => {
    useTaskStore.setState({
      tasks: [{ id: 1, text: "Test Task", completed: false }],
    });
    const { tasks } = useTaskStore.getState();

    expect(tasks.length).toBe(1);

    expect(tasks[0].text).toBe("Test Task");
    expect(tasks[0].completed).toBe(false);
  });
});

describe("useTaskStore with Mocks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTaskStore.setState({ tasks: [], loading: false });
  });

  it("should fetch tasks and update state (Mocked Fetch)", async () => {
    const mockTasks = [{ id: 1, text: "Mocked Task", completed: false }];
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockTasks),
    });

    await useTaskStore.getState().fetchTasks();

    const { tasks, loading } = useTaskStore.getState();

    expect(loading).toBe(false);
    expect(tasks.length).toBe(1);
    expect(tasks[0].text).toBe("Mocked Task");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/tasks");
  });

  it("should handle fetch erros gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Nectwor error"));

    await useTaskStore.getState().fetchTasks();

    const { tasks, loading } = useTaskStore.getState();

    expect(loading).toBe(false);
    expect(tasks).toEqual([]);
  });
});

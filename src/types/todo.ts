export type TodoFilter = "all" | "active" | "completed";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type { Todo };

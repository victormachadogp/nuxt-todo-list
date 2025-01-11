import type { Todo } from "@/types/todo";

export function sortTodosByDate(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

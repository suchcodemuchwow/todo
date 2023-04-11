import { isToday, isTomorrow, isAfter, isBefore, parseISO } from "date-fns";

type TodoSection = {
  title: "Today" | "Tomorrow" | "Future" | "Overdue";
  data: ITodo[];
}[];

export function categorizeTodosByDueDate(todos: ITodos): TodoSection {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const future = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);

  return [
    {
      title: "Today",
      data: Object.values(todos).filter((todo) => isToday(parseISO(todo.due))),
    },
    {
      title: "Tomorrow",
      data: Object.values(todos).filter((todo) =>
        isTomorrow(parseISO(todo.due))
      ),
    },
    {
      title: "Future",
      data: Object.values(todos).filter((todo) =>
        isAfter(parseISO(todo.due), future)
      ),
    },
    {
      title: "Overdue",
      data: Object.values(todos).filter((todo) =>
        isBefore(parseISO(todo.due), today)
      ),
    },
  ];
}

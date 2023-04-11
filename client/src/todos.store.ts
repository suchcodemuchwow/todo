import { TodosApi } from "../api-client";
import { create } from "zustand";

interface TodoState {
  todos: ITodos;
  fetchTodos: () => Promise<void>;
  addTodo: (data: ICreateTodoBody) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (id: string, data: IUpdateTodoBody) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  focusTodo: (id: string) => void;
}

const api = new TodosApi();

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: {},
  fetchTodos: async () => {
    const response = await api.todosControllerFindAll();
    set((state) => ({
      todos: response.reduce(
        (acc, todo) => ({
          ...acc,
          [todo.id]: {
            ...todo,
            isFocused: false,
          },
        }),
        {}
      ),
    }));
  },
  addTodo: async (data) => {
    const response = await api.todosControllerCreate({
      createTodoDto: { ...data },
    });

    set((state) => ({
      todos: {
        ...state.todos,
        [response.id]: {
          ...response,
          isFocused: false,
        },
      },
    }));
  },
  deleteTodo: async (id: string) => {
    await api.todosControllerRemove({ id });
    set((state) => {
      const { [id]: _, ...todos } = state.todos;
      return { todos };
    });
  },
  editTodo: async (id: string, data: ITodo) => {
    await api.todosControllerUpdate({ id, updateTodoDto: data });
    set((state) => ({
      todos: {
        ...state.todos,
        [id]: {
          ...state.todos[id],
          ...data,
        },
      },
    }));
  },
  toggleTodo: async (id: string) => {
    const todo = get().todos[id];
    await api.todosControllerUpdate({
      id,
      updateTodoDto: { isCompleted: !todo.isCompleted },
    });
    set((state) => ({
      todos: {
        ...state.todos,
        [id]: {
          ...state.todos[id],
          isCompleted: !state.todos[id].isCompleted,
        },
      },
    }));
  },
  focusTodo: (id: string) => {
    set((state) => ({
      todos: {
        ...state.todos,
        [id]: {
          ...state.todos[id],
          isFocused: true,
        },
      },
    }));
  },
}));

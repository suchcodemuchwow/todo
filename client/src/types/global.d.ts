import { ITodoApiResponse } from "api-client";

declare global {
  type ITodoEntity = ITodoApiResponse;

  type ITodo = ITodoEntity & {
    isFocused: boolean;
  };

  type ITodos = {
    [id: string]: ITodo;
  };

  type ICreateTodoBody = {
    title: string;
    body?: string;
    isCompleted?: boolean;
    due?: string;
  };

  type IUpdateTodoBody = {
    title?: string;
    body?: string;
    isCompleted?: boolean;
    due?: string;
  };
}

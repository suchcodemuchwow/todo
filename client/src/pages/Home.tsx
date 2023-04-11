import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Center } from "native-base";

import { AddTodoModal, TodoList } from "@components";
import { useTodoStore } from "../todos.store";

export function Home() {
  const { top, bottom } = useSafeAreaInsets();
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  React.useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Center h={"full"} w={"full"} pt={top} pb={bottom}>
      <TodoList />
      <AddTodoModal />
    </Center>
  );
}

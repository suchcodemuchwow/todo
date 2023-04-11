import React, { useEffect } from "react";
import { Input } from "native-base";
import { useTodoStore } from "../../todos.store";

export function EditTodoItem(props: { id; onEditFinish: () => void }) {
  const todo = useTodoStore((state) => state.todos[props.id]);
  const editTodo = useTodoStore((state) => state.editTodo);

  const [title, setTitle] = React.useState(todo.title);
  const [body, setBody] = React.useState(todo.body);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await editTodo(props.id, { title, body });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [title, body]);

  const onBlur = async () => {
    await editTodo(props.id, { title, body });
    props.onEditFinish();
  };

  return (
    <>
      <Input
        variant="unstyled"
        value={title}
        placeholder={"Enter title"}
        fontSize={"xl"}
        fontWeight={"bold"}
        style={{ height: 28 }}
        onBlur={onBlur}
        onChangeText={setTitle}
      />
      <Input
        variant="unstyled"
        value={body}
        placeholder={"Enter body"}
        fontSize={"sm"}
        onBlur={onBlur}
        onChangeText={setBody}
      />
    </>
  );
}

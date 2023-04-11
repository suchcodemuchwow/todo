import { Pressable } from "native-base";
import * as Icons from "@expo/vector-icons";
import React from "react";
import { useTodoStore } from "../../todos.store";

type IRightSwipeActionProps = {
  id: string;
  onPressEdit: () => void;
  onPressToggle: () => void;
};

export const RightSwipeAction = (props: IRightSwipeActionProps) => {
  const { isCompleted } = useTodoStore((state) => state.todos[props.id]);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  async function onPressToggle() {
    await toggleTodo(props.id);
    props.onPressToggle();
  }

  return (
    <>
      <Pressable
        w={16}
        bg={isCompleted ? "green.300" : "coolGray.300"}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={onPressToggle}
      >
        <Icons.Feather
          name={isCompleted ? "check-circle" : "circle"}
          size={20}
          color="white"
        />
      </Pressable>
      <Pressable
        w={16}
        bg={"blue.300"}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={props.onPressEdit}
      >
        <Icons.Feather name={"edit"} size={20} color="white" />
      </Pressable>
    </>
  );
};

type ILeftSwipeActionProps = {
  id: string;
  onPressDelete: () => void;
};

export const LeftSwipeAction = (props: ILeftSwipeActionProps) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  async function onPressDelete() {
    await deleteTodo(props.id);
    props.onPressDelete();
  }

  return (
    <Pressable
      w={16}
      bg={"red.300"}
      alignItems={"center"}
      justifyContent={"center"}
      onPress={onPressDelete}
    >
      <Icons.Feather name={"trash"} size={20} color="white" />
    </Pressable>
  );
};

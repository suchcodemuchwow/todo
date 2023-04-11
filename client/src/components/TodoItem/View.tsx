import { Heading, Text, VStack } from "native-base";
import { getHumanReadableTime } from "@utils";
import React from "react";
import { useTodoStore } from "../../todos.store";

export const ViewTodoItem = React.memo(
  (props: { id: string }) => {
    const { title, body, isCompleted, due } = useTodoStore(
      (state) => state.todos[props.id]
    );

    const timeLeft = getHumanReadableTime(due);
    const fontColor = isCompleted ? "gray.400" : "gray.800";

    return (
      <VStack>
        <Heading
          fontSize={body ? "lg" : "xl"}
          color={fontColor}
          strikeThrough={isCompleted}
        >
          {title}
        </Heading>
        {body && (
          <Text fontSize="xs" color={fontColor} strikeThrough={isCompleted}>
            {body}
          </Text>
        )}
        <Text
          fontSize="10"
          alignSelf="flex-end"
          color={fontColor}
          strikeThrough={isCompleted}
        >
          {timeLeft}
        </Text>
      </VStack>
    );
  },
  (p, n) => p.id !== n.id
);

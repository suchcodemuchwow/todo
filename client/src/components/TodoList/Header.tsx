import React, { useMemo } from "react";
import { Heading, HStack, Text } from "native-base";

type ITodoListSectionHeaderProps = {
  title: string;
  data: ITodo[];
};

export function Header(props: ITodoListSectionHeaderProps) {
  const total = useMemo(() => props.data.length, [props.data.length]);
  const completed = useMemo(
    () => props.data.filter((todo) => todo.isCompleted).length,
    [props.data]
  );

  const sectionInfo =
    total === 0 ? "No todos" : `${completed}/${total} completed`;

  return (
    <HStack alignItems={"center"} justifyContent={"space-between"} marginY={4}>
      <Heading size={"2xl"}>{props.title}</Heading>
      <Text>{sectionInfo}</Text>
    </HStack>
  );
}

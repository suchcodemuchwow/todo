import React from "react";
import { SectionList } from "native-base";
import { categorizeTodosByDueDate } from "@utils";
import { Header, SwipeableTodoItem } from "@components";
import { useTodoStore } from "../../todos.store";

const responsiveWidth = { base: "full", sm: "480px", md: "768px" };

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <SectionList
      h={"100vh"}
      showsVerticalScrollIndicator={false}
      w={responsiveWidth}
      py={24}
      px={4}
      keyExtractor={(item, index) => item.id + index}
      sections={categorizeTodosByDueDate(todos)}
      renderSectionHeader={({ section: { title, data } }) => (
        <Header data={data} title={title} />
      )}
      renderItem={({ item }) => <SwipeableTodoItem key={item.id} {...item} />}
    />
  );
}

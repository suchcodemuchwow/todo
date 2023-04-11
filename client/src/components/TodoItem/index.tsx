import React, { useCallback, useEffect, useRef, useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { VStack } from "native-base";

import { EditTodoItem, ViewTodoItem } from "@components";
import { SWIPEABLE_FRICTION } from "../../constants";
import { LeftSwipeAction, RightSwipeAction } from "./SwipeAction";
import { useTodoStore } from "../../todos.store";
import { StyleSheet } from "react-native";

export const SwipeableTodoItem = ({ id }: { id: string }) => {
  const focusTodo = useTodoStore((state) => state.focusTodo);
  const isFocused = useTodoStore((state) => state.todos[id].isFocused);

  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<Swipeable>(null);

  useEffect(() => {
    if (!isFocused) {
      ref.current?.close();
    }
  }, [isFocused]);

  const onSwipeBegan = () => {
    focusTodo(id);
  };

  const willSwipeBack = () => {
    ref.current?.close();
  };

  const onPressEdit = () => {
    willSwipeBack();
    setIsEditing((prev) => !prev);
  };

  const renderLeftActions = useCallback(() => {
    return <LeftSwipeAction id={id} onPressDelete={willSwipeBack} />;
  }, [id]);

  const renderRightActions = useCallback(() => {
    return (
      <RightSwipeAction
        id={id}
        onPressEdit={onPressEdit}
        onPressToggle={willSwipeBack}
      />
    );
  }, [id]);

  return (
    <Swipeable
      ref={ref}
      containerStyle={styles.swipeContainer}
      friction={isEditing ? 9999 : SWIPEABLE_FRICTION}
      leftThreshold={8}
      rightThreshold={8}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onBegan={onSwipeBegan}
    >
      <VStack
        p={4}
        space={1}
        bgColor={isEditing ? "blue.50" : "white"}
        justifyContent={"center"}
      >
        {isEditing ? (
          <EditTodoItem id={id} onEditFinish={() => setIsEditing(false)} />
        ) : (
          <ViewTodoItem id={id} />
        )}
      </VStack>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
});

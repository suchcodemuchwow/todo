import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Checkbox,
  Fab,
  FormControl,
  Icon,
  Input,
  Modal,
  TextArea,
} from "native-base";

import { todoSchema } from "@validators";
import { useTodoStore } from "../todos.store";

const ControlledField = ({ label, error, children, ...rest }: any) => (
  <FormControl isInvalid={error.length > 0} {...rest}>
    <FormControl.Label>{label}</FormControl.Label>
    {children}
    <FormControl.ErrorMessage>{error.join(", ")}</FormControl.ErrorMessage>
  </FormControl>
);

const FabIcon = <Icon as={AntDesign} name="plus" />;

const emptyTodo = {
  title: "",
  body: undefined,
  due: undefined,
  isCompleted: false,
};

export const AddTodoModal = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setData] = useState({ ...emptyTodo });

  const [errors, setErrors] = useState({
    title: [],
    body: [],
    due: [],
  });

  const validate = async () => {
    try {
      await todoSchema.validate({ ...formData }, { abortEarly: false });
      setErrors({ title: [], body: [], due: [] });
      return true;
    } catch (error) {
      const newErrors = { title: [], body: [], due: [] };
      error.inner.forEach((e: any) => newErrors[e.path].push(e.message));
      setErrors(newErrors);
      return false;
    }
  };

  const onSubmit = async () => {
    const isValid = await validate();

    if (!isValid) {
      return;
    }

    addTodo({ ...formData });
    setData({ ...emptyTodo });
    setErrors({ title: [], body: [], due: [] });
    setModalOpen(false);
  };

  const onCancel = () => {
    setData({ ...emptyTodo });
    setErrors({ title: [], body: [], due: [] });
    setModalOpen(false);
  };

  const onChangeText = (key: string) => (value: string) => {
    setData({ ...formData, [`${key}`]: value });
  };

  const onPressFab = () => {
    setModalOpen((p) => !p);
  };

  return (
    <>
      <Fab onPress={onPressFab} icon={FabIcon} />
      <Modal isOpen={isModalOpen} onClose={onCancel} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>🤔 Wanna add a new todo? </Modal.Header>
          <Modal.Body>
            <ControlledField label="Title" error={errors.title}>
              <Input onChangeText={onChangeText("title")} />
            </ControlledField>
            <ControlledField label="Body" error={errors.body}>
              <TextArea
                autoCompleteType={false}
                onChangeText={onChangeText("body")}
              />
            </ControlledField>
            <ControlledField label="Due" error={errors.due}>
              <Input onChangeText={onChangeText("due")} />
            </ControlledField>
            <FormControl mt="3">
              <Checkbox.Group
                onChange={(v) =>
                  setData({
                    ...formData,
                    // @ts-ignore
                    isCompleted: v.includes("isCompleted"),
                  })
                }
                aria-label={"isCompleted"}
              >
                <Checkbox value="isCompleted">Completed</Checkbox>
              </Checkbox.Group>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
                Cancel
              </Button>
              <Button onPress={onSubmit}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

import * as yup from "yup";
import {
  BODY_MAX_LENGTH,
  BODY_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from "../constants";

export const todoSchema = yup.object({
  title: yup.string().min(TITLE_MIN_LENGTH).max(TITLE_MAX_LENGTH).required(),
  body: yup.string().min(BODY_MIN_LENGTH).max(BODY_MAX_LENGTH).optional(),
  due: yup
    .string()
    .optional()
    .test(
      "is-valid-date",
      "Please enter a valid UTC date",
      (value) => !value || !isNaN(new Date(value).getTime())
    ),
  isCompleted: yup.boolean().optional(),
});

export type ITodoSchema = yup.InferType<typeof todoSchema>;

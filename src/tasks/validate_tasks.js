import { checkSchema, validationResult } from "express-validator";

const tasksSchema = {
  content: {
    in: ["body"],
    isString: {
      errorMessage: "Tasks must have a content which is a string.",
    },
  },
  done: {
    in: ["body"],
    isBoolean: true,
    errorMessage:
      "'Done' is a required boolean value which must be either true or false.",
  },
};

export const checkTasksSchema = checkSchema(tasksSchema);

export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
};

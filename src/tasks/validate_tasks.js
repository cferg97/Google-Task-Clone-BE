import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const { BadRequest, NotFound } = createHttpError;

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
  if (!errors.isEmpty()) {
    next(
      BadRequest("Error during task validation", { errorsList: errors.array() })
    );
  } else {
    next();
  }
};

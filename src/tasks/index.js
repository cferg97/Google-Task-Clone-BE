import express from "express";
import uniqid from "uniqid";
import { checkTasksSchema, triggerBadRequest } from "./validate_tasks.js";
import { getTasks, writeTasks } from "../lib/tools.js";

const tasksRouter = express.Router();

tasksRouter.get("/", async (req, res, next) => {
  try {
    const tasksArray = await getTasks();
    const filteredTasks = tasksArray.filter((task) => task.done === false);
    res.status(200).send(filteredTasks);
  } catch (err) {
    next(err);
  }
});


export default tasksRouter;

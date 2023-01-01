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

tasksRouter.post(
  "/",
  checkTasksSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newPost = {
        ...req.body,
        createdAt: new Date(),
        id: uniqid(),
        plannerID: req.body.plannerID,
      };
      const tasks = await getTasks();
      tasks.push(newPost);
      await writeTasks(tasks);
      res.status(201).send({ id: newPost.id });
    } catch (err) {
      next(err);
    }
  }
);

tasksRouter.put("/:postid", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    const index = tasks.findIndex((task) => task.id === req.params.postid);
    if (index !== -1) {
      const oldTask = tasks[index];
      const updatedTask = { ...oldTask, ...req.body, updatedAt: new Date() };
      tasks[index] = updatedTask;
      await writeTasks(tasks);
      res.send(updatedTask);
    } else {
      res.status(404).send("No post found with that ID.");
    }
  } catch (err) {
    next(err);
  }
});

tasksRouter.delete("/:postid", async (req, res, next) => {
  try {
    const tasks = await getTasks();
    const remainingTasks = tasks.filter(
      (task) => task.id !== req.params.postid
    );
    if (tasks.length !== remainingTasks.length) {
      await writeTasks(remainingTasks);
      res.status(204).send();
    } else {
      res.status(404).send("No post found with that ID.");
    }
  } catch (err) {
    next(err);
  }
});

export default tasksRouter;

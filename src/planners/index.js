import express from "express";
import { getPlanners, writePlanners, getTasks } from "../lib/tools.js";
import uniqid from "uniqid";

const plannersRouter = express.Router();

plannersRouter.get("/", async (req, res, next) => {
  try {
    const plannerArr = await getPlanners();
    const tasksArr = await getTasks();

    //for each item in planner array, iterate through tasks and return matching tasks

    const joinArrs = plannerArr.map((plan) => {
      // return {
      //   "planner": plan.name,
      //   "tasks": tasksArr.filter((m) => m.plannerID === plan.id)
      // };
      const planner = plan;
      const tasks = tasksArr.filter((m) => m.plannerID === plan.id);
      return { Planner: planner, tasks };
    });

    res.send(joinArrs);
  } catch (err) {
    next(err);
  }
});

plannersRouter.post("/", async (req, res, next) => {
  try {
    const newPlanner = {
      ...req.body,
      createdAt: new Date(),
      id: req.body.name,
    };
    const planners = await getPlanners();
    planners.push(newPlanner);
    await writePlanners(planners);
    res.status(201).send({ id: newPlanner.id });
  } catch (err) {
    next(err);
  }
});

plannersRouter.put("/:plannerid", async (req, res, next) => {
  try {
    const planners = await getPlanners();
    const index = planners.findIndex(
      (plan) => plan.id === req.params.plannerid
    );
    if (index !== -1) {
      const oldPlanner = planners[index];
      const updatedPlanner = {
        ...oldPlanner,
        ...req.body,
        updatedAt: new Date(),
      };
      planners[index] = updatedPlanner;
      await writePlanners(planners);
      res.send(updatedPlanner);
    } else {
      res.status(404).send("No planner found by that ID");
    }
  } catch (err) {
    next(err);
  }
});

plannersRouter.delete("/:plannerid", async (req, res, next) => {
  try {
    const planners = await getPlanners();
    const remainingPlanners = planners.filter(
      (plan) => plan.id !== req.params.plannerid
    );
    if (planners.length !== remainingPlanners.length) {
      await writePlanners(remainingPlanners);
      res.status(204).send();
    } else {
      res.status(404).send("No planner found with that ID");
    }
  } catch (err) {
    next(err);
  }
});

export default plannersRouter;

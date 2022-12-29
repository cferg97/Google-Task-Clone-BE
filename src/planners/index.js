import express from "express";
import { getPlanners, writePlanners, getTasks } from "../lib/tools.js";

const plannersRouter = express.Router();

plannersRouter.get("/", async (req, res, next) => {
    try{
        const plannerArr = await getPlanners()
        const tasksArr = await getTasks()

        
    }
})
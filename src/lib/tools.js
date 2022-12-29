import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const plannerJSONpath = join(dataFolderPath, "planners.json");
const tasksJSONpath = join(dataFolderPath, "task.json");

export const getTasks = () => readJSON(tasksJSONpath);
export const writeTasks = (taskArray) => writeJSON(tasksJSONpath, taskArray);
export const getPlanners = () => readJSON(plannerJSONpath);
export const writePlanners = (plannerArray) =>
  writeJSON(plannerJSONpath, plannerArray);

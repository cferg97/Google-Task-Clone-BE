import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import tasksRouter from "./tasks/index.js";
import plannersRouter from "./planners/index.js";
import * as dotenv from "dotenv";

const server = express();
dotenv.config();
const port = process.env.PORT;

const publicFolderPath = join(process.cwd(), "./public");

server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

server.use("/tasks", tasksRouter);
server.use("/planners", plannersRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is running on port:", port);
});

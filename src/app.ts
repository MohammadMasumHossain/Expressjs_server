import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRouter } from "./modules/user/user.routes";
import { todorouter } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

initDB();

//parser
app.use(express.json());

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello next level developer!");
});

app.use("/users", userRouter);

// todos crud
app.use("/todos", todorouter);

//
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;

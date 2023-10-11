import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Amar IT Backend Server");
});

export default app;
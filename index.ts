import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { bowlingController } from "./controllers";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/calculate", bowlingController);

app.get("*", (req: Request, res: Response) => {
  res.send("Nothing here folks...");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

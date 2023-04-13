import express, { Request, Response, Router } from "express";
import { INewFrame, IScoreBoardDataDto } from "../interfaces";
import { ErrorResponse } from "../models/ErrorResponse";
import { calculate } from "../services/bowlingService";

export const bowlingController: Router = express.Router();

bowlingController.post("", (req: Request, res: Response) => {
  const body: INewFrame = req.body;

  const caluclatedScoreBoardData = calculate(body);

  res.json(caluclatedScoreBoardData);
});

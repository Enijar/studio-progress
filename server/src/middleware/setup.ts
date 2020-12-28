import { NextFunction, Request, Response } from "express";
import database from "../services/database";

export default async function setup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.locals.database = await database();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { server: "Server error" } });
  }
}

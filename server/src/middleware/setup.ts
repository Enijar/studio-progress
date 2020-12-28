import { Request, Response, NextFunction } from "express";
import { createConnection, getConnection } from "typeorm";
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "../services/config";
import Repository from "../entities/repository";
import Author from "../entities/author";
import Commit from "../entities/commit";

export default async function setup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let connection = getConnection();
    if (!connection.isConnected) {
      // @ts-ignore
      connection = await createConnection({
        type: DB_TYPE,
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        entities: [Repository, Author, Commit],
        synchronize: true,
        logging: false,
      });
    }
    res.locals.database = connection;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { server: "Server error" } });
  }
}

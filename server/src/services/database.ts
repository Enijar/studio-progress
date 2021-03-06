import { createConnection, getConnection } from "typeorm";
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "./config";
import Repository from "../entities/repository";
import Author from "../entities/author";
import Commit from "../entities/commit";

export { Repository, Author, Commit };

export default async function database() {
  let connection;
  try {
    connection = getConnection();
  } catch {
    connection = null;
  }
  if (!connection || !connection.isConnected) {
    // @ts-ignore
    connection = await createConnection({
      name: "default",
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
  return connection;
}

import { createConnection } from "typeorm";
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
  // @ts-ignore
  return createConnection({
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

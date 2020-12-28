import "reflect-metadata";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "..", "..", ".env") });

export const PORT = process.env?.PORT ?? 8080;
export const DB_TYPE = process.env?.DB_TYPE ?? "mysql";
export const DB_HOST = process.env?.DB_HOST ?? "localhost";
export const DB_PORT = process.env?.DB_PORT ?? 3306;
export const DB_USERNAME = process.env?.DB_USERNAME ?? "";
export const DB_PASSWORD = process.env?.DB_PASSWORD ?? "";
export const DB_DATABASE = process.env?.DB_DATABASE ?? "studio-progress";

import * as express from "express";
import { Application } from "express";
import * as cors from "cors";
import { PORT } from "./services/config";
import database from "./services/database";
import jobs from "./services/jobs";
import activityLatest from "./actions/activity/latest";
import setup from "./middleware/setup";

const app: Application = express();

(async () => {
  try {
    const connection = await database();
    await connection.close();

    jobs();

    app.use(cors());

    app.get("/activity/latest", [setup], activityLatest);

    app.listen(PORT, () => {
      console.log(`Server running http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

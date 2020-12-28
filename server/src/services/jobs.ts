import { CronJob } from "cron";
import updateRepos from "../jobs/update-repos";
import updateCommits from "../jobs/update-commits";

let running = false;

export default function jobs() {
  new CronJob(
    "0 */5 * * * *",
    async () => {
      if (running) return;
      running = true;
      console.log("Starting background jobs...");
      await updateRepos();
      await updateCommits();
      console.log("Background jobs finished");
      running = false;
    },
    null,
    true,
    "Europe/London"
  );
}

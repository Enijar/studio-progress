import {
  latestRepositories,
  sortByMostCommits,
  sortByMostRecent,
} from "../utils";
import { API_ENDPOINT } from "../consts";

export async function fetchLatestActivity() {
  try {
    const url = `${API_ENDPOINT}/activity/latest`;
    const activities = await fetch(url).then((res) => res.json());
    return {
      activities,
      recentActivities: sortByMostCommits(activities),
      recentRepositories: sortByMostRecent(latestRepositories(activities)),
    };
  } catch (err) {
    console.error(err);
    return {
      recentActivities: [],
      recentRepositories: [],
    };
  }
}

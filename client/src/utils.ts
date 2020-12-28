import { formatDistance } from "date-fns";
import { Activity, Repository } from "./types";

export function sortByMostCommits(activity: Activity[]): Activity[] {
  return activity.sort((a, b) => {
    return b.commits.length - a.commits.length;
  });
}

export function sortByMostRecent(repositories: Repository[]): Repository[] {
  return repositories.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function latestRepositories(activity: Activity[]): Repository[] {
  const latestRepositories: Repository[] = [];
  activity.forEach((activity) => {
    activity.commits.forEach((commit) => {
      const index = latestRepositories.findIndex(
        (item) => item.id === commit.repository.id
      );
      if (index === -1) {
        latestRepositories.push(commit.repository);
      }
    });
  });
  return latestRepositories.slice(0, 10);
}

export function timeSinceDate(dateString: string): string {
  return formatDistance(new Date(dateString), new Date());
}

export const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
};

export function hash(value: string): number {
  let hash = 0;
  if (value.length === 0) {
    return hash;
  }
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function colorFromValue(value: string): string {
  const seed = hash(value);
  const h = seed % 360;
  return `hsl(${h}, 100%, 35%)`;
}

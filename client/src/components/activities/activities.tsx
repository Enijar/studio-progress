import React from "react";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  ActivitiesAvatar,
  ActivitiesItem,
  ActivitiesRepository,
  ActivitiesWrapper,
  ActivityWrapper,
} from "./styles";
import { Activity, Repository } from "../../types";
import { colorFromValue, timeSinceDate } from "../../utils";
import Avatar from "../avatar/avatar";
import { fetchLatestActivity } from "../../services/api";

type ChartDataSet = {
  label: string;
  fill: boolean;
  backgroundColor: string;
  borderColor: string;
  data: number[];
};

type ChartData = {
  labels: string[];
  datasets: ChartDataSet[];
};

export default function Activities() {
  const [data, setData] = React.useState<Activity[]>([]);
  const [lineChartData, setLineChartData] = React.useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [repositories, setRepositories] = React.useState<Repository[]>([]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    (async function update() {
      const res = await fetchLatestActivity();
      setData(res.activities);
      setActivities(res.recentActivities);
      setRepositories(res.recentRepositories);
      timeout = setTimeout(update, 5000);
    })();
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    type StringNumber = {
      [key: string]: number;
    };
    const labels: string[] = [];
    const datasets: ChartDataSet[] = data.map((item) => {
      const commitsPerDay: StringNumber = {};
      item.commits.forEach((commit) => {
        const day = format(new Date(commit.createdAt), "MMM do");
        if (!labels.includes(day)) {
          labels.push(day);
        }
        if (!commitsPerDay.hasOwnProperty(day)) {
          commitsPerDay[day] = 0;
        }
        commitsPerDay[day]++;
      });
      const color = colorFromValue(item.uuid);
      return {
        label: item.name,
        fill: false,
        backgroundColor: color,
        borderColor: color,
        data: Object.values(commitsPerDay),
      };
    });
    setLineChartData({ labels, datasets });
  }, [data]);

  return (
    <ActivitiesWrapper>
      <ActivityWrapper>
        <h1>Developer Activity</h1>
        {activities.map((activity) => {
          const commitsTotal = activity.commits.length;
          const latestCommit = activity.commits[0] ?? null;
          return (
            <ActivitiesItem key={activity.id}>
              <ActivitiesAvatar uuid={activity.uuid}>
                <Avatar name={activity.name} />
              </ActivitiesAvatar>
              <div>
                <div>
                  {activity.name} has{" "}
                  <em>
                    <strong>
                      {commitsTotal} commit
                      {commitsTotal === 1 ? "" : "s"}
                    </strong>
                  </em>{" "}
                  over 7 days
                </div>
                {latestCommit && (
                  <div>
                    <ActivitiesRepository
                      uuid={latestCommit?.repository?.uuid ?? ""}
                    >
                      {latestCommit.repository.name}
                    </ActivitiesRepository>
                    <time>{timeSinceDate(latestCommit.createdAt)} ago</time>
                  </div>
                )}
              </div>
            </ActivitiesItem>
          );
        })}
      </ActivityWrapper>

      <ActivityWrapper>
        <h1>Project Activity</h1>
        {repositories.map((repository) => {
          return (
            <ActivitiesItem key={repository.id}>
              <div>
                <ActivitiesRepository uuid={repository.uuid}>
                  {repository.name}
                </ActivitiesRepository>
                <time>{timeSinceDate(repository.updatedAt)} ago</time>
              </div>
            </ActivitiesItem>
          );
        })}
      </ActivityWrapper>

      <ActivityWrapper>{<Line data={lineChartData} />}</ActivityWrapper>
    </ActivitiesWrapper>
  );
}

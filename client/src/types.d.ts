export type Repository = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  language: string;
  createdAt: string;
  updatedAt: string;
};

export type Commit = {
  id: number;
  message: string;
  hash: string;
  createdAt: string;
  repository: Repository;
};

export type Activity = {
  id: number;
  uuid: string;
  name: string;
  avatar: string;
  commits: Commit[];
};

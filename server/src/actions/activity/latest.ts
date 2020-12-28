import { Request, Response } from "express";
import Author from "../../entities/author";

export default async function activityLatest(req: Request, res: Response) {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const authors = await Author.createQueryBuilder("author")
      .innerJoinAndSelect("author.commits", "commits")
      .innerJoinAndSelect("commits.repository", "repository")
      .orderBy("commits.createdAt", "DESC")
      .having("commits.createdAt >= :oneWeekAgo", { oneWeekAgo })
      .getMany();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
}

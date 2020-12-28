import bitbucket from "../services/bitbucket";
import database, { Repository, Author, Commit } from "../services/database";

(async () => {
  try {
    const username = "FinerVision";
    const connection = await database();
    const repositories = await connection
      .getRepository(Repository)
      .createQueryBuilder("repository")
      .limit(10)
      .orderBy("updatedAt", "DESC")
      .getMany();

    for (let i = 0; i < repositories.length; i++) {
      const repository = repositories[i];
      const url = `https://api.bitbucket.org/2.0/repositories/${username}/${repository.uuid}/commits`;
      const commits = await bitbucket.get(url, 2);

      for (let j = 0; j < commits.length; j++) {
        const item = commits[j];
        let authorName = item.author.user?.display_name;
        authorName = authorName ?? item.author.raw ?? "";
        authorName = authorName.split("<")[0].trim();
        const authorUuid =
          item.author.user?.uuid ??
          item.author.user?.account_id ??
          item.author.raw;

        let author = await connection.manager.findOne(Author, {
          uuid: authorUuid,
        });
        if (!author) {
          author = new Author();
          author.uuid = authorUuid;
          author.name = authorName;
          author.avatar = item.author.user?.links?.avatar?.href ?? "";
          author = await connection.manager.save(author);
        }

        let commit = await connection.manager.findOne(Commit, {
          hash: item.hash,
        });
        if (!commit) commit = new Commit();
        commit.author = author;
        commit.message = item.message;
        commit.hash = item.hash;
        commit.createdAt = new Date(item.date);
        commit.repository = repository;
        await connection.manager.save(commit);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

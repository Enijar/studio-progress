import bitbucket from "../services/bitbucket";
import database, { Repository } from "../services/database";

export default async function updateRepos() {
  try {
    console.log("Start processing update-repos...");

    const connection = await database();
    const username = "FinerVision";
    const url = `https://api.bitbucket.org/2.0/teams/${username}/repositories`;
    const repositories = await bitbucket.get(url);

    for (let i = 0; i < repositories.length; i++) {
      const item = repositories[i];
      let repository = await connection.manager.findOne(Repository, {
        uuid: item.uuid,
      });
      if (!repository) repository = new Repository();
      repository.uuid = item.uuid;
      repository.name = item.name;
      repository.description = item.description;
      repository.language = item.language;
      repository.updatedAt = new Date(item.updated_on);
      repository.createdAt = new Date(item.created_on);
      await connection.manager.save(repository);
    }

    console.log("Finished processing update-repos");
  } catch (err) {
    console.error(err);
    console.error("Error processing update-repos");
  }
}

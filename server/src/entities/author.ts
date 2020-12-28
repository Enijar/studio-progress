import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Commit from "./commit";

@Entity({ name: "authors" })
export default class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Commit, (commit) => commit.author)
  commits: Commit[];

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  avatar: string;
}

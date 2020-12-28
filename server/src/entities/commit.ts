import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Repository from "./repository";
import Author from "./author";

@Entity({ name: "commits" })
export default class Commit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Repository)
  repository: Repository;

  @ManyToOne(() => Author, (commit) => commit.id)
  author: Author;

  @Column()
  message: string;

  @Column()
  hash: string;

  @Column({ type: "datetime" })
  createdAt: Date;
}

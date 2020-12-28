import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "repositories" })
export default class Repository extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  language: string;

  @Column({ type: "datetime" })
  createdAt: Date;

  @Column({ type: "datetime" })
  updatedAt: Date;
}

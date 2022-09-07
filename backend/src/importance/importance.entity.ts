import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { ImportanceRating } from "./importance-rating.enum";
import { User } from "src/user/user.entity";

@Entity()
export class Importance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: ImportanceRating.POOR })
  rating: ImportanceRating;

  @ManyToOne(
    (type) => User,
    (user) => {
      user.importance;
    },
    { onDelete: "CASCADE" },
  )
  user: User;
}

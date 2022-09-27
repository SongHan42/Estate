import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { ImportanceRating } from "src/importance/importance-rating.enum";
import { Evaluation } from "src/evaluation/evaluation.entity";

@Entity()
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: ImportanceRating;

  @Column()
  title: string;

  @Column({ type: "decimal", precision: 3, scale: 1, default: 0.5 })
  star: number;

  @ManyToOne((type) => Evaluation, (evaluation) => evaluation.grade, {
    onDelete: "CASCADE",
  })
  evaluation: Evaluation;
}

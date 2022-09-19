import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { House } from "src/house/house.entity";
import { ImportanceRating } from "src/importance/importance-rating.enum";

@Entity()
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: ImportanceRating;

  @Column()
  title: string;

  @Column({ default: 1 })
  star: number;

  @ManyToOne(
    type => House,
    house => house.grade,
    { onDelete: "CASCADE" },
  )
  house: House;
}

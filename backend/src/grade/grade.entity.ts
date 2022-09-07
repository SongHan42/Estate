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
  importance: ImportanceRating;

  @Column()
  title: string;

  @Column({ default: 0 })
  star: number;

  @Column({ default: "" })
  memo: string;

  @ManyToOne((type) => House, (house) => house.grade)
  house: House;
}

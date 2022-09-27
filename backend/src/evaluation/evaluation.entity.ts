import { Grade } from "src/grade/grade.entity";
import { House } from "src/house/house.entity";
import { User } from "src/user/user.entity";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isBookmark: boolean;

  @Column()
  memo: string;

  @OneToMany((type) => Grade, (grade) => grade.evaluation)
  grade: Grade[];

  @ManyToOne(
    (type) => User,
    (user) => {
      user.evaluation;
    },
    { onDelete: "CASCADE" },
  )
  user: User;

  @ManyToOne(
    (type) => House,
    (house) => {
      house.evaluation;
    },
    { onDelete: "CASCADE" },
  )
  house: House;
}

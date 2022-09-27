import { House } from "src/house/house.entity";
import { User } from "src/user/user.entity";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";

@Entity()
export class LikeHouse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => User,
    (user) => {
      user.likeHouse;
    },
    { onDelete: "CASCADE" },
  )
  user: User;

  @ManyToOne(
    (type) => House,
    (house) => {
      house.likeHouse;
    },
    { onDelete: "CASCADE" },
  )
  house: House;
}

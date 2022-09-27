import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import { House } from "src/house/house.entity";
import { Importance } from "src/importance/importance.entity";
import { Exclude } from "class-transformer";
import { LikeHouse } from "src/like-house/like-house.entity";
import { Evaluation } from "src/evaluation/evaluation.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isFirstLogin: boolean;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @OneToMany(
    (type) => Importance,
    (importance) => {
      importance.user;
    },
  )
  importance: Importance[];

  @OneToMany(
    (type) => House,
    (house) => {
      house.user;
    },
  )
  house: House[];

  @OneToMany(
    (type) => LikeHouse,
    (likeHouse) => {
      likeHouse.user;
    },
  )
  likeHouse: LikeHouse[];

  @OneToMany((type)=>Evaluation, (evaluation=>evaluation.user))
  evaluation: Evaluation[];
}

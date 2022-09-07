import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import { House } from "src/house/house.entity";
import { Importance } from "src/importance/importance.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  firstLogin: boolean;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

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
}

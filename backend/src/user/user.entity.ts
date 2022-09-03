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
  user_id: string;

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

//로그인 하고 -> firstLogin : true로 바꿔주고 , 디폴트 임폴턴스 생성해주기!

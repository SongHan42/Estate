import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { HouseType, TradeType } from "./house-type.enum";
import { User } from "src/user/user.entity";
import { LikeHouse } from "src/like-house/like-house.entity";
import { Evaluation } from "src/evaluation/evaluation.entity";

@Entity()
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isOffering: boolean;

  @Column({ default: "" })
  address: string;

  detailedAddress: string;

  @Column()
  tradeType: TradeType;

  @Column()
  houseType: HouseType;

  @Column({ default: 0 })
  area: number;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  deposit: number;

  @Column({ default: 0 })
  rent: number;

  @Column({ default: 0 })
  maintenanceFee: number;

  @Column({ default: "" })
  description: string;

  @Column({ default: 0 })
  floor: number;

  @Column({ default: 0 })
  roomNum: number;

  @Column({ default: "" })
  img: string;

  @ManyToOne((type) => User, (user) => user.house, { onDelete: "CASCADE" })
  user: User;

  @OneToMany((type) => LikeHouse, (likeHouse) => likeHouse.house, {
    onDelete: "CASCADE",
  })
  likeHouse: LikeHouse;

  @OneToMany((type) => Evaluation, (evaluation) => evaluation.house)
  evaluation: Evaluation[];
}

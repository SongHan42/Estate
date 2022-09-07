import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { HouseType } from "./house-type.enum";
import { User } from "src/user/user.entity";
import { Grade } from "src/grade/grade.entity";

@Entity()
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: HouseType;

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

  @OneToMany((type) => Grade, (grade) => grade.house, { onDelete: "CASCADE" })
  grade: Grade[];

  @ManyToOne((type) => User, (user) => user.house, { onDelete: "CASCADE" })
  user: User;
}

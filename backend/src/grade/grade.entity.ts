import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { House } from 'src/house/house.entity';

@Entity()
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  star: number;

  @Column()
  memo: string;

  @ManyToOne((type) => House, (house) => house.grade)
  house: House;
}

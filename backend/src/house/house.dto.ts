import { Grade } from "src/grade/grade.entity";
import { HouseType } from "./house-type.enum";

export class HouseDto {
  title: string;
  type: HouseType;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenance_fee: number;
  grade: Grade[]; //테스트필요
}

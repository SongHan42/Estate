import { Grade } from "src/grade/grade.entity";
import { HouseType } from "./house-type.enum";

export class PostHouseDto {
  type: HouseType;
  title: string;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenance_fee: number;
  grade: Grade[];
}

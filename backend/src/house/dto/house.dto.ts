import { GradeDto } from "src/grade/grade.dto";
import { HouseType } from "../house-type.enum";

export class HouseDto {
  title: string;
  type: HouseType;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  gradeDto: GradeDto[]; //테스트필요
}

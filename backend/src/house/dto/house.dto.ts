import { GradeDto } from "src/grade/grade.dto";
import { HouseType, TradeType } from "../house-type.enum";

export class HouseDto {
  title: string;
  houseType: HouseType;
  tradeType: TradeType;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  address: string;
  detailedAddress: string;
  floor: number;
  roomNum: number;
  memo: string;
  grade: GradeDto[]; //테스트필요
}

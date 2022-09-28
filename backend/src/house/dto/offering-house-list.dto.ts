import { GradeDto } from "src/grade/grade.dto";
import { HouseType, TradeType } from "../house-type.enum";
import { House } from "../house.entity";

export class OfferingHouseListDto {
  constructor(house: House) {
    this.id = house.id;
    this.title = house.title;
    this.houseType = house.houseType;
    this.tradeType = house.tradeType;
    this.area = house.area;
    this.price = house.price;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenanceFee = house.maintenanceFee;
    this.img = house.img;
  }
  id: number;
  title: string;
  houseType: HouseType;
  tradeType: TradeType;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  img: string;
  //   grade: GradeDto[];
}

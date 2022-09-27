import { Grade } from "src/grade/grade.entity";
import { HouseType, TradeType } from "../house-type.enum";
import { House } from "../house.entity";

export class HouseDetailDto {
  constructor(house: House, grade: Grade[]) {
    this.title = house.title;
    this.houseType = house.houseType;
    this.tradeType = house.tradeType;
    this.area = house.area;
    this.price = house.price;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenanceFee = house.maintenanceFee;
    this.address = house.address;
    this.floor = house.floor;
    this.img = house.img;
    this.memo = house.evaluation[0].memo;
    this.grade = grade;
  }
  title: string;
  houseType: HouseType;
  tradeType: TradeType;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  address: string;
  floor: number;
  roomNum: number;
  img: string;
  memo: string;
  grade: Grade[];
}

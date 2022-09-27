import { HouseType, TradeType } from "src/house/house-type.enum";
import { House } from "src/house/house.entity";

export class LikeHouseDto {
  constructor(house: House) {
    this.id = house.id;
    this.houseType = house.houseType;
    this.tradeType = house.tradeType;
    this.area = house.area;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenanceFee = house.maintenanceFee;
    this.address = house.address;
    this.floor = house.floor;
    this.roomNum = house.roomNum;
    this.img = house.img;
    this.description = house.description;
  }
  id: number;
  houseType: HouseType;
  tradeType: TradeType;
  area: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  address: string;
  floor: number;
  roomNum: number;
  img: string;
  description: string;
}

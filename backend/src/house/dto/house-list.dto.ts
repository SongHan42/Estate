import { HouseType } from "../house-type.enum";
import { House } from "../house.entity";

export class HouseListDto {
  constructor(house: House) {
    this.type = house.type;
    this.title = house.title;
    this.area = house.area;
    this.price = house.price;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenance_fee = house.maintenance_fee;
  }
  type: HouseType;
  title: string;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenance_fee: number;
}

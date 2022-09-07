import { HouseType } from "../house-type.enum";
import { House } from "../house.entity";

export class HouseListDto {
  constructor(house: House) {
    this.id = house.id;
    this.type = house.type;
    this.title = house.title;
    this.area = house.area;
    this.price = house.price;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenanceFee = house.maintenanceFee;
  }
  id: number;
  type: HouseType;
  title: string;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
}

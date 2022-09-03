import { HouseType } from "./house-type.enum";

export class HouseListDto {
  type: HouseType;
  title: string;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenance_fee: number;
}

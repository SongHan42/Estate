import { HouseType, TradeType } from "../house-type.enum";

export class UpdateOfferingDto {
  id: number;
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
  description: string;
}

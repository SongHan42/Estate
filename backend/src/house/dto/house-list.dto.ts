import { HouseType, TradeType } from "../house-type.enum";
import { House } from "../house.entity";
import { ImportanceRating } from "src/importance/importance-rating.enum";
import { Grade } from "src/grade/grade.entity";

export class HouseListDto {
  constructor(house: House, grade: Grade[], isBookmark: boolean) {
    this.id = house.id;
    this.title = house.title;
    this.houseType = house.houseType;
    this.tradeType = house.tradeType;
    this.area = house.area;
    this.price = house.price;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenanceFee = house.maintenanceFee;
    this.isBookmark = isBookmark;
    this.address = house.address;
    this.floor = house.floor;
    this.roomNum = house.roomNum;
    this.img = house.img;
    this.description = house.description;

    grade.forEach((grade) => {
      if (grade.rating === ImportanceRating.HIGH) {
        this.highAvg += grade.star;
      } else if (grade.rating === ImportanceRating.MIDDLE) {
        this.middleAvg += grade.star;
      } else if (grade.rating === ImportanceRating.LOW) {
        this.lowAvg += Number(grade.star);
      }
    });
    this.highAvg = this.highAvg
      ? this.highAvg /
        grade.filter((value) => value.rating === ImportanceRating.HIGH).length
      : 0;
    this.middleAvg = this.middleAvg
      ? this.middleAvg /
        grade.filter((value) => value.rating === ImportanceRating.MIDDLE).length
      : 0;
    this.lowAvg = this.lowAvg
      ? this.lowAvg /
        grade.filter((value) => value.rating === ImportanceRating.LOW).length
      : 0;
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
  isBookmark: boolean;
  highAvg = 0;
  middleAvg = 0;
  lowAvg = 0;
  address: string;
  floor: number;
  roomNum: number;
  img: string;
  description: string;
}

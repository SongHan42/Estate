import { HouseType } from "../house-type.enum";
import { House } from "../house.entity";
import { ImportanceRating } from "src/importance/importance-rating.enum";

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
    this.isBookmark = house.isBookmark;
    this.memo = house.memo;
    house.grade.forEach((grade) => {
      if (grade.rating === ImportanceRating.HIGH) {
        this.highAvg += grade.star;
      } else if (grade.rating === ImportanceRating.MIDDLE) {
        this.middleAvg += grade.star;
      } else if (grade.rating === ImportanceRating.LOW) {
        this.lowAvg += Number(grade.star);
      }
    });
    console.log(this.lowAvg);
    this.highAvg = this.highAvg
      ? this.highAvg /
        house.grade.filter((value) => value.rating === ImportanceRating.HIGH)
          .length
      : 0;
    this.middleAvg = this.middleAvg
      ? this.middleAvg /
        house.grade.filter((value) => value.rating === ImportanceRating.MIDDLE)
          .length
      : 0;
    this.lowAvg = this.lowAvg
      ? this.lowAvg /
        house.grade.filter((value) => value.rating === ImportanceRating.LOW)
          .length
      : 0;
  }
  id: number;
  type: HouseType;
  title: string;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  isBookmark: boolean;
  memo: string;
  highAvg = 0;
  middleAvg = 0;
  lowAvg = 0;
}

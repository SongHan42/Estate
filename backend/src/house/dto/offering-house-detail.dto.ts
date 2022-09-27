import { EvaluationDto } from "src/evaluation/dto/evaluation.dto";
import { Evaluation } from "src/evaluation/evaluation.entity";
import { House } from "../house.entity";

export class OfferingHouseDetailDto {
  constructor(house: House, evaluations: Evaluation[]) {
    this.id = house.id;
    this.title = house.title;
    this.area = house.area;
    this.price = house.price;
    this.deposit = house.deposit;
    this.rent = house.rent;
    this.maintenanceFee = house.maintenanceFee;
    evaluations.forEach((evaluation) => {
      this.evaluation.push(new EvaluationDto(evaluation));
    });
  }
  id: number;
  title: string;
  area: number;
  price: number;
  deposit: number;
  rent: number;
  maintenanceFee: number;
  evaluation: EvaluationDto[];
}

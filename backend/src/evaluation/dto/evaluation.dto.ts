import { ImportanceRating } from "src/importance/importance-rating.enum";
import { Evaluation } from "../evaluation.entity";

export class EvaluationDto {
  constructor(evaluation: Evaluation) {
    this.id = evaluation.id;
    this.nickname = evaluation.user.nickname;
    evaluation.grade.forEach((grade) => {
      if (grade.rating === ImportanceRating.HIGH) {
        this.highAvg += grade.star;
      } else if (grade.rating === ImportanceRating.MIDDLE) {
        this.middleAvg += grade.star;
      } else if (grade.rating === ImportanceRating.LOW) {
        this.lowAvg += grade.star;
      }
    });
    this.highAvg = this.highAvg
      ? this.highAvg /
        evaluation.grade.filter(
          (value) => value.rating === ImportanceRating.HIGH,
        ).length
      : 0;
    this.middleAvg = this.middleAvg
      ? this.middleAvg /
        evaluation.grade.filter(
          (value) => value.rating === ImportanceRating.MIDDLE,
        ).length
      : 0;
    this.lowAvg = this.lowAvg
      ? this.lowAvg /
        evaluation.grade.filter(
          (value) => value.rating === ImportanceRating.LOW,
        ).length
      : 0;
  }
  id: number;
  nickname: string;
  highAvg: number;
  middleAvg: number;
  lowAvg: number;
}

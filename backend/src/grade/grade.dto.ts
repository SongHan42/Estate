import { Grade } from "./grade.entity";
import { ImportanceRating } from "src/importance/importance-rating.enum";

export class GradeDto {
  constructor(grade: Grade) {
    this.id = grade.id;
    this.rating = grade.rating;
    this.title = grade.title;
    this.star = grade.star;
  }
  id: number;
  rating: ImportanceRating;
  title: string;
  star: number;
}

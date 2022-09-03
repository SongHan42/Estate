import { ImportanceRating } from "./importance-rating.enum";
import { Importance } from "./importance.entity";

export class ImportanceDto {
  constructor(importance: Importance) {
    this.title = importance.title;
    this.rating = importance.rating;
  }
  title: string;
  rating: ImportanceRating;
}

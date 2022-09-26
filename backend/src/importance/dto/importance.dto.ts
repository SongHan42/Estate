import { ImportanceRating } from "../importance-rating.enum";
import { Importance } from "../importance.entity";

export class ImportanceDto {
  constructor(importance: Importance) {
    this.id = importance.id;
    this.title = importance.title;
    this.rating = importance.rating;
  }
  id: number;
  title: string;
  rating: ImportanceRating;
}

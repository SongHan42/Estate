import { ImportanceRating } from "../importance-rating.enum";
import { Importance } from "../importance.entity";

export class ReturnImportanceDto {
  constructor(importance: Importance) {
    this.id = importance.id;
    this.title = importance.title;
    this.rating = importance.rating;
    this.userId = importance.user.id;
  }
  id: number;
  title: string;
  rating: ImportanceRating;
  userId: number;
}

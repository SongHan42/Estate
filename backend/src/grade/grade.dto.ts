import { Grade } from "./grade.entity";

export class GradeDto {
  constructor(grade: Grade) {
    this.id = grade.id;
    this.title = grade.title;
    this.star = grade.star;
    this.memo = grade.memo;
  }
  id: number;
  title: string;
  star: number;
  memo: string;
}

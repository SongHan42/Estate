import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "./grade.entity";
import { GradeDto } from "./grade.dto";
import { Evaluation } from "src/evaluation/evaluation.entity";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async createGrade(evaluation: Evaluation, grades: GradeDto[]) {
    for await (const grade of grades) {
      const add_grade: Grade = this.gradeRepository.create({
        rating: grade.rating,
        title: grade.title,
        star: grade.star,
        evaluation,
      });
      await add_grade.save();
    }
  }
}

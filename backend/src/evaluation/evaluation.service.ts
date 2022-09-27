import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GradeDto } from "src/grade/grade.dto";
import { GradeService } from "src/grade/grade.service";
import { House } from "src/house/house.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Evaluation } from "./evaluation.entity";

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
    private gradeService: GradeService,
  ) {}

  async createEvaluation(
    user: User,
    house: House,
    memo: string,
    gradeDto: GradeDto[],
  ) {
    const evaluation: Evaluation = this.evaluationRepository.create({
      user,
      house,
      memo,
    });
    await evaluation.save();

    this.gradeService.createGrade(evaluation, gradeDto);
  }

  async updateBookmark(userId: number, houseId: number): Promise<void> {
    const evaluation: Evaluation = await this.evaluationRepository.findOne({
      where: { user: { id: userId }, house: { id: houseId } },
    });
    if (!evaluation) throw new NotFoundException();
    evaluation.isBookmark = !evaluation.isBookmark;
    await evaluation.save();
  }
}

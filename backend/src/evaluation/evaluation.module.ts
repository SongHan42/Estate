import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "src/grade/grade.entity";
import { GradeModule } from "src/grade/grade.module";
import { GradeService } from "src/grade/grade.service";
import { EvaluationController } from "./evaluation.controller";
import { Evaluation } from "./evaluation.entity";
import { EvaluationService } from "./evaluation.service";

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, Grade])],
  controllers: [EvaluationController],
  providers: [EvaluationService, GradeService],
})
export class EvaluationModule {}

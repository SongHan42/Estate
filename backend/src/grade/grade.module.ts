import { Module } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { GradeController } from "./grade.controller";
import { Grade } from "./grade.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Evaluation } from "src/evaluation/evaluation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Evaluation])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}

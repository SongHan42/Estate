import { Module } from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseController } from "./house.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { House } from "./house.entity";
import { User } from "src/user/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { Importance } from "src/importance/importance.entity";
import { Grade } from "src/grade/grade.entity";
import { LikeHouse } from "src/like-house/like-house.entity";
import { EvaluationService } from "src/evaluation/evaluation.service";
import { Evaluation } from "src/evaluation/evaluation.entity";
import { GradeService } from "src/grade/grade.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      House,
      User,
      Importance,
      Grade,
      LikeHouse,
      Evaluation,
    ]),
    AuthModule,
  ],
  providers: [HouseService, EvaluationService, GradeService],
  controllers: [HouseController],
})
export class HouseModule {}

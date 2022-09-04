import { Module } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { GradeController } from "./grade.controller";
import { Grade } from "./grade.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Importance } from "src/importance/importance.entity";
import { House } from "src/house/house.entity";
import { HouseModule } from "src/house/house.module";

@Module({
  imports: [TypeOrmModule.forFeature([Grade, User, Importance])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}

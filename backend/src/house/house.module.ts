import { Module } from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseController } from "./house.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { House } from "./house.entity";
import { User } from "src/user/user.entity";
import { GradeService } from "src/grade/grade.service";
import { AuthModule } from "src/auth/auth.module";
import { Importance } from "src/importance/importance.entity";
import { Grade } from "src/grade/grade.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([House, User, Importance, Grade]),
    AuthModule,
  ],
  providers: [HouseService, GradeService],
  controllers: [HouseController],
})
export class HouseModule {}

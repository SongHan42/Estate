import { Module } from "@nestjs/common";
import { ImportanceController } from "./importance.controller";
import { ImportanceService } from "./importance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { User } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Importance, User])],
  controllers: [ImportanceController],
  providers: [ImportanceService],
})
export class ImportanceModule {}

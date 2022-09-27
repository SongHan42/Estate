import { Module } from "@nestjs/common";
import { ImportanceController } from "./importance.controller";
import { ImportanceService } from "./importance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { User } from "src/user/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { LikeHouse } from "src/like-house/like-house.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Importance, User, LikeHouse]),
    AuthModule,
  ],
  controllers: [ImportanceController],
  providers: [ImportanceService],
})
export class ImportanceModule {}

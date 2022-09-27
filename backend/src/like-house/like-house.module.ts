import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { House } from "src/house/house.entity";
import { User } from "src/user/user.entity";
import { LikeHouseController } from "./like-house.controller";
import { LikeHouse } from "./like-house.entity";
import { LikeHouseService } from "./like-house.service";

@Module({
  imports: [TypeOrmModule.forFeature([LikeHouse, User, House])],
  controllers: [LikeHouseController],
  providers: [LikeHouseService],
})
export class LikeHouseModule {}

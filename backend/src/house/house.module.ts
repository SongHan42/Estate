import { Module } from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseController } from "./house.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { House } from "./house.entity";
import { User } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([House, User])],
  providers: [HouseService],
  controllers: [HouseController],
})
export class HouseModule {}

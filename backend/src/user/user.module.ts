import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Importance } from "src/importance/importance.entity";
import { ImportanceService } from "src/importance/importance.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Importance])],
  controllers: [UserController],
  providers: [UserService, ImportanceService],
  exports: [UserService],
})
export class UserModule {}

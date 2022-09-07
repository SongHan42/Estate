import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { AuthModule } from "src/auth/auth.module";
import { Importance } from "src/importance/importance.entity";
import { ImportanceService } from "src/importance/importance.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Importance]), AuthModule],
  controllers: [UserController],
  providers: [UserService, ImportanceService],
})
export class UserModule {}

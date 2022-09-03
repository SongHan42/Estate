import { Module } from "@nestjs/common";
import { ImportanceController } from "./importance.controller";
import { ImportanceService } from "./importance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { User } from "src/user/user.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Importance, User]), AuthModule],
  controllers: [ImportanceController],
  providers: [ImportanceService],
  // exports: [ImportanceService],
})
export class ImportanceModule {}

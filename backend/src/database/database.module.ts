import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { User } from "src/user/user.entity";
import { Importance } from "src/importance/importance.entity";
import { House } from "src/house/house.entity";
import { Grade } from "src/grade/grade.entity";
import { LikeHouse } from "src/like-house/like-house.entity";
import { Evaluation } from "src/evaluation/evaluation.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User, Importance, House, Grade, LikeHouse, Evaluation],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

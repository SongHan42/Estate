import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { HouseModule } from "./house/house.module";
import { GradeModule } from "./grade/grade.module";
import { ImportanceModule } from "./importance/importance.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";
import { User } from "./user/user.entity";
import { Importance } from "./importance/importance.entity";
import { House } from "./house/house.entity";
import { Grade } from "./grade/grade.entity";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      ignoreEnvFile: process.env.NODE_ENV === "prod",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "prod").required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== "prod",
      entities: [User, Importance, House, Grade],
    }),
    UserModule,
    HouseModule,
    GradeModule,
    ImportanceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
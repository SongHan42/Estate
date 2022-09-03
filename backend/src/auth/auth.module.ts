import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { ImportanceService } from "src/importance/importance.service";
import { Importance } from "src/importance/importance.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // 토큰을 생성할 때 씀
      signOptions: {
        expiresIn: 365 * 24 * 12, //토큰의 유효시간 3600 = 1시간
        // 갱신도~해야함!
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
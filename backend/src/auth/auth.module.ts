import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/user/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "src/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    // PassportModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_ACCESS_SECRET_KEY"),
        signOptions: {
          expiresIn: `${configService.get("JWT_ACCESS_EXPIRATION_TIME")}s`,
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}

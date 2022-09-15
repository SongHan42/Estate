import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token",
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Refresh;
          // if (request) {
          // if (request.cookies) return request.cookies.Refresh;
          // }
        },
      ]),
      secretOrKey: configService.get("JWT_REFRESH_SECRET_KEY"),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    if (req) {
      if (req.cookies) {
        const refreshToken = req.cookies.Refresh;
        return this.userService.getUserIfRefreshTokenMatches(
          refreshToken,
          payload.id,
        );
      }
    }
  }
}

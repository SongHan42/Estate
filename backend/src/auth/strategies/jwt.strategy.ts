import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          if (request) {
            if (request.cookies) return request.cookies.Authentication;
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_ACCESS_SECRET_KEY"),
    });
  }

  async validate(payload: any) {
    // return { userId: payload.sub, username: payload.username };
    const user: User = await this.userRepository.findOneBy({
      userId: payload.sub,
    });
    if (!user) throw new NotFoundException();
    return user;
  }
}

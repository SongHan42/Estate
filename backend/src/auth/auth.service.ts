import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { hash } from "bcrypt";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userId: string, plainPassword: string): Promise<any> {
    try {
      const user: User = await this.userRepository.findOneBy({ userId });
      await this.verifyPassword(plainPassword, user.password);
      const { password, ...result } = user;
      return result;
    } catch (e) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(userId: string, password: string) {
    const user: User = await this.validateUser(userId, password);
    // const payload = { userId: user.userId, sub: user.id };
    // const accessToken = this.jwtService.sign(payload);
    return user;
  }

  async logout() {
    return {
      token: "",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      maxAge: 0,
    };
  }

  getJwtAccessToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_ACCESS_SECRET_KEY"),
      expiresIn: `${this.configService.get("JWT_ACCESS_EXPIRATION_TIME")}s`,
    });
    return {
      accessToken: token,
    };
  }

  getJwtRefreshToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_REFRESH_SECRET_KEY"),
      expiresIn: `${this.configService.get("JWT_REFRESH_EXPIRATION_TIME")}s`,
    });

    return { refreshToken: token };
  }

  getCookiesForLogOut() {
    return {
      accessOption: {
        // domain: "localhost",
        // path: "/",
        // httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        // domain: "localhost",
        // path: "/",
        // httpOnly: true,
        maxAge: 0,
      },
    };
  }
  // async logIn(userId: string, password: string): Promise<any> {
  //   const user = await this.userRepository.findOneBy({ userId });
  //   if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

  //   if (!(await await bcrypt.compare(password, user.password)))
  //     throw new UnauthorizedException("login Failed");

  //   const payload = { userId };
  //   const accessToken = await this.jwtService.sign(payload);

  //   return {
  //     token: accessToken,
  //     isFirstLogin: user.firstLogin,
  //   };
  // }
}

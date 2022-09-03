import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  //   async logIn(user_id: string, password: string): Promise<any> {
  //     const user = await this.userRepository.findOneBy({ user_id });
  //     if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

  //     if (!(await await bcrypt.compare(password, user.password)))
  //       throw new UnauthorizedException("login Failed");

  //     const payload = { user_id };
  //     const accessToken = await this.jwtService.sign(payload);

  //     return {
  //       token: accessToken,
  //       isFirstLogin: user.firstLogin,
  //     };
  //   }
}

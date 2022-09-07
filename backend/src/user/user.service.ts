import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserInfoDto } from "./dto/user-info.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ImportanceService } from "src/importance/importance.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private importanceService: ImportanceService,
  ) {}

  async getUserInfo(id: number): Promise<any> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const userInfoDto: UserInfoDto = {
      userId: user.userId,
      nickname: user.nickname,
      email: user.email,
    };

    return userInfoDto;
  }

  async checkDupUserInfo(
    type: string,
    arg: string,
  ): Promise<{ isSuccess: boolean }> {
    if (arg === "") throw new BadRequestException(`빈 문자열 존재`);

    let found: User;

    if (type === "userId")
      found = await this.userRepository.findOne({
        where: { userId: arg },
      });
    else if (type === "email")
      found = await this.userRepository.findOne({ where: { email: arg } });
    else if (type === "nickname")
      found = await this.userRepository.findOne({ where: { nickname: arg } });

    if (!found) return { isSuccess: true };
    throw new ConflictException(`중복 존재`); //이게 맞을까?
  }

  async initUser(createUserDto: CreateUserDto): Promise<any> {
    const { userId, email, nickname } = createUserDto;

    try {
      await this.checkDupUserInfo("user_id", userId);
      await this.checkDupUserInfo("email", email);
      await this.checkDupUserInfo("nickname", nickname);
    } catch (e) {
      throw e;
    }
    return await this.createUser(createUserDto);
  }

  private async createUser(createUserDto: CreateUserDto) {
    const { userId, password, email, nickname } = createUserDto;

    const user: User = this.userRepository.create({
      userId,
      email,
      nickname,
    });

    if (password != "") {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    } else throw new BadRequestException(`비밀번호를 입력하세요`);

    await user.save();

    await this.importanceService.createDefaultImportance(user.id);

    return { isSuccess: true };
  }
}

import { Injectable } from '@nestjs/common';
import { UserInfoDto } from './user-info.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async getUserInfo(id: number): Promise<any> {
    // const user: User = await this.userRepository.findOne(id);
  }
  private async createUser(userInfoDto: UserInfoDto) {
    const { user_id, password, email, nickname } = userInfoDto;

    const user: User = this.userRepository.create({
      user_id,
      email,
      nickname,
    });

    if (password != '') {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();
  }

  async checkDupId(user_id: string): Promise<{ isSuccess: boolean }> {
    const found: User = await this.userRepository.findOneBy({user_id});
    if (!found) return { isSuccess: true };
    return { isSuccess: false };
  }

  async initUser(userInfoDto: UserInfoDto): Promise<any> {
    const { user_id, email, nickname } = userInfoDto;

    // 아이디, 이메일, 닉네임 중복 확인 한번 더 하기

    await this.createUser(userInfoDto);
  }

}

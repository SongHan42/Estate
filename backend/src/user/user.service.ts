import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserInfoDto } from './user-info.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserInfo(id: number): Promise<any> {
    // const user: User = await this.userRepository.findOne(id);
  }

  async checkDupId(user_id: string): Promise<{ isSuccess: boolean }> {
    const found: User = await this.userRepository.findOne({
      where: { user_id },
    });
    console.log('hi');
    if (!found) return { isSuccess: true };
    return { isSuccess: false };
  }

  async initUser(userInfoDto: UserInfoDto): Promise<any> {
    const { user_id, email, nickname } = userInfoDto;

    // 아이디, 이메일, 닉네임 중복 확인 한번 더 하기

    await this.userRepository.createUser(userInfoDto);
  }
}

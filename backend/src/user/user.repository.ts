import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInfoDto } from './user-info.dto';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userInfoDto: UserInfoDto) {
    const { user_id, password, email, nickname } = userInfoDto;

    const user: User = this.create({
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
}

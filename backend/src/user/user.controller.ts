import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfoDto } from './user-info.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id') //미완 유저정보 반환
  async getUserInfo(@Param('id') id: number): Promise<any> {
    return this.userService.getUserInfo(id);
  }

  @Get('/id/:user_id')
  checkDupId(
    @Param('user_id') user_id: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupId(user_id);
  }

  @Get('/email/:email')
  checkDupEmail(@Param('email') email: string): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupEmail(email);
  }

  @Get('/nickname/:nickname')
  checkDupNickname(@Param('nickname') nickname: string):Promise<{ isSuccess: boolean }>{
    return this.userService.checkDupNickname(nickname);
  }
  @Post()
  async initUser(@Body() userInfoDto: UserInfoDto): Promise<any> {
    return this.userService.initUser(userInfoDto);
  }
}

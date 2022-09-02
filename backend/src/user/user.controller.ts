import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfoDto } from './user-info.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id') //미완
  async getUserInfo(@Param('id') id: number): Promise<any> {
    return this.userService.getUserInfo(id);
  }

  @Get('/id/:user_id')
  checkDupId(
    @Param('user_id') user_id: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupId(user_id);
  }

  @Post()
  async initUser(@Body() userInfoDto: UserInfoDto): Promise<any> {
    return this.userService.initUser(userInfoDto);
  }
}

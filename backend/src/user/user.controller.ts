import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserInfo(@GetUserId() id: number): Promise<any> {
    return this.userService.getUserInfo(id);
  }

  @Get("/id/:user_id")
  checkDupId(
    @Param("userId")
    userId: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("userId", userId);
  }

  @Get("/email/:email")
  checkDupEmail(
    @Param("email")
    email: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("email", email);
  }

  @Get("/nickname/:nickname")
  checkDupNickname(
    @Param("nickname")
    nickname: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("nickname", nickname);
  }

  @Post()
  async initUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.initUser(createUserDto);
  }
}

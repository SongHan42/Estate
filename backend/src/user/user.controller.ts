import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/skip-auth.decorator";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @UseGuards(AuthGuard("jwt"))
  getUserInfo(@GetUserId() id: number): Promise<any> {
    return this.userService.getUserInfo(id);
  }

  @Public()
  @Get("/id/:userId")
  checkDupId(
    @Param("userId")
    userId: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("userId", userId);
  }

  @Public()
  @Get("/email/:email")
  checkDupEmail(
    @Param("email")
    email: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("email", email);
  }

  @Public()
  @Get("/nickname/:nickname")
  checkDupNickname(
    @Param("nickname")
    nickname: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("nickname", nickname);
  }

  @Public()
  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.createNewUser(createUserDto);
  }
}

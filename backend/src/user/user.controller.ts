import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserId } from "../auth/get-userId.decorator";
import { Public } from "src/skip-auth.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserInfo(@GetUserId() id: number): Promise<any> {
    return this.userService.getUserInfo(id);
  }

  @Delete()
  deleteUser(@GetUserId() id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Public()
  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.userService.createNewUser(createUserDto);
  }

  @Patch()
  updateUser(
    @GetUserId() id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserDto);
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
}

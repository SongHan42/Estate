import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/:id")
  getUserInfo(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<any> {
    return this.userService.getUserInfo(id);
  }

  @Get("/id/:user_id")
  checkDupId(
    @Param("user_id")
    user_id: string,
  ): Promise<{ isSuccess: boolean }> {
    return this.userService.checkDupUserInfo("user_id", user_id);
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

import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Res,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../skip-auth.decorator";
import { Response } from "express";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller("auth")
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // @Post("/login")
  // logIn(
  //   @Body("userId") userId: string,
  //   @Body("password") password: string,
  // ): Promise<any> {
  //   return this.authService.logIn(userId, password);
  // }
  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post("/login")
  // async login(@Req() req, @Res({ passthrough: true }) res: Response) {
  async login(
    // @Body("userId") userId: string,
    // @Body("password") password: string,
    @Body() { userId, password },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: User = await this.authService.login(userId, password);
    const { accessToken, ...accessOption } = this.authService.getJwtAccessToken(
      user.id,
    );
    const { refreshToken, ...refreshOption } =
      this.authService.getJwtRefreshToken(user.id);
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    res.cookie("Authentication", accessToken, accessOption);
    res.cookie("Refresh", refreshToken, refreshOption);
    if (user.firstLogin === false) {
      user.firstLogin = true; //user.save작동ㅎ안훼~~
      // await this.userRepository.update(id, { currentHashedRefreshToken });
      await this.userRepository.update(user.id, { firstLogin: true });
    }
    // const { token, isFirstLogin, ...option } = await this.authService.login(
    //   req.user,
    // );
    // res.cookie("Authentication", token, option);
    return { token: accessToken, isFirstLogin: user.firstLogin };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("logout")
  async logOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(req.user.id);

    res.cookie("Authentication", "", accessOption);
    res.cookie("Refresh", "", refreshOption);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const { accessToken, ...accessOption } = this.authService.getJwtAccessToken(
      user.id,
    );
    res.cookie("Authentication", accessToken, accessOption);
    return user;
  }
}

import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Res,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "../skip-auth.decorator";
import { Response } from "express";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetUserId } from "./get-userId.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(
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
    if (user.firstLogin === false)
      await this.userRepository.update(user.id, { firstLogin: true });

    return { accessToken, refreshToken, isFirstLogin: user.firstLogin };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("/logout")
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessOption, refreshOption } =
      this.authService.getCookiesForLogOut();

    await this.userService.removeRefreshToken(req.user.id);

    res.cookie("Authentication", "", accessOption);
    res.cookie("Refresh", "", refreshOption);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get("/refresh")
  async refresh(
    @GetUserId() id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException();
    const { accessToken, ...accessOption } = this.authService.getJwtAccessToken(
      user.id,
    );
    // res.cookie("Authentication", accessToken, accessOption);
    return { accessToken };
  }
}

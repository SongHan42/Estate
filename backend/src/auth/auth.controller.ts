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
import * as bcrypt from "bcryptjs";

@Controller("auth")
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post("/login")
  async login(
    @Body() { userId, password },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: User = await this.authService.login(userId, password);
    const { accessToken, ...accessOption } = this.authService.getJwtAccessToken(
      user.id,
    );
    const { refreshToken } = this.authService.getJwtRefreshToken(user.id);
    const salt = await bcrypt.genSalt();
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    if (user.isFirstLogin === true)
      await this.userRepository.update(user.id, {
        isFirstLogin: false,
      });

    await this.userRepository.update(user.id, { currentHashedRefreshToken });

    return { accessToken, refreshToken, isFirstLogin: user.isFirstLogin };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("/logout")
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.userService.removeRefreshToken(req.user.id);
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
    const { accessToken } = this.authService.getJwtAccessToken(user.id);
    return { accessToken };
  }
}

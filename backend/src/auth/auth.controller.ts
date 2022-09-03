import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  logIn(
    @Body("user_id") user_id: string,
    @Body("password") password: string,
  ): Promise<any> {
    return this.authService.logIn(user_id, password);
  }
}

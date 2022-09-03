import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  logIn(@Body() user_id: string, password: string): Promise<any> {
    return;
    // return this.authService.logIn(user_id, password);
  }
}

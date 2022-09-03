import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

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

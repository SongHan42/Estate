import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Post() //미완 서비스 완성시키기
  @UseGuards(AuthGuard())
  initUserImportance(@GetUserId() id: number): Promise<any> {
    return this.importanceService.initUserImportance(id);
  }

  @Get() //미완 서비스 완성시키기
  @UseGuards(AuthGuard())
  getUserImportance(@GetUserId() id: number): Promise<any> {
    return this.importanceService.getUserImportance(id);
  }
}

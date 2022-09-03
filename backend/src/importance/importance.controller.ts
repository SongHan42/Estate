import { Controller, Get, Post, UseGuards, Body } from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ImportanceDto } from "./importance.dto";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Post() //미완 서비스 완성시키기
  @UseGuards(AuthGuard())
  initUserImportance(
    @GetUserId() id: number,
    @Body() edit: ImportanceDto,
  ): Promise<any> {
    //importanceDto 비어있으면 안되다는 조건 추가!
    return this.importanceService.initUserImportance(id, edit);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUserImportance(@GetUserId() id: number): Promise<ImportanceDto[]> {
    return this.importanceService.getUserImportance(id);
  }
}

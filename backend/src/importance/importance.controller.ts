import { Controller, Get, Post, UseGuards, Body, Patch } from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ImportanceDto } from "./importance.dto";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserImportance(@GetUserId() id: number): Promise<ImportanceDto[]> {
    return this.importanceService.getUserImportance(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  initUserImportance(
    @GetUserId() id: number,
    @Body() importance: ImportanceDto,
  ): Promise<any> {
    return this.importanceService.initUserImportance(id, importance);
  }

  @Patch()
  @UseGuards(AuthGuard())
  editUserImportance(
    @GetUserId() id: number,
    @Body() importance: ImportanceDto,
  ): Promise<any> {
    return this.importanceService.editUserImportance(id, importance);
  }
}

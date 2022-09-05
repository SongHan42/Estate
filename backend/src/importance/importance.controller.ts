import { Controller, Get, Post, UseGuards, Body, Patch } from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ImportanceDto } from "./importance.dto";
import { Importance } from "./importance.entity";
import { ReturnImportanceDto } from "./return-importance.dto";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserImportance(@GetUserId() id: number): Promise<Importance[]> {
    return this.importanceService.getUserImportance(id);
  }

  @Patch()
  @UseGuards(AuthGuard())
  postUserImportance(
    @GetUserId() id: number,
    @Body() importanceDtoList: ImportanceDto[],
  ): Promise<ReturnImportanceDto[]> {
    return this.importanceService.editUserImportance(id, importanceDtoList);
  }
}

import { Controller, Get, Post, UseGuards, Body, Patch } from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ImportanceDto } from "./importance.dto";
import { Importance } from "./importance.entity";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserImportance(@GetUserId() id: number): Promise<Importance[]> {
    return this.importanceService.getUserImportance(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  postUserImportance(
    @GetUserId() id: number,
    @Body() importanceDtoList: ImportanceDto[],
  ): Promise<any> {
    return this.importanceService.postUserImportance(id, importanceDtoList);
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

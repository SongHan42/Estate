import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ImportanceDto } from "./dto/importance.dto";
import { Importance } from "./importance.entity";
import { ReturnImportanceDto } from "./dto/return-importance.dto";

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
  editUserImportance(
    @GetUserId() id: number,
    @Body("importances") importanceDtoList: ImportanceDto[],
  ): Promise<ReturnImportanceDto[]> {
    return this.importanceService.editUserImportance(id, importanceDtoList);
  }

  @Delete("/:importanceId")
  @UseGuards(AuthGuard())
  deleteUserImportance(
    @GetUserId() id: number,
    @Param("importanceId", ParseIntPipe) importanceId: number,
  ): Promise<{ isSuccess: boolean }> {
    return this.importanceService.deleteUserImportance(id, importanceId);
  }
}

import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { ImportanceDto } from "./dto/importance.dto";
import { Importance } from "./importance.entity";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Get()
  getUserImportance(@GetUserId() id: number): Promise<Importance[]> {
    return this.importanceService.getUserImportance(id);
  }

  @Patch()
  editUserImportance(
    @GetUserId() id: number,
    @Body("importances") importanceDtoList: ImportanceDto[],
  ): void {
    this.importanceService.editUserImportance(id, importanceDtoList);
  }

  @Delete("/:importanceId")
  deleteUserImportance(
    @GetUserId() id: number,
    @Param("importanceId", ParseIntPipe) importanceId: number,
  ): Promise<{ isSuccess: boolean }> {
    return this.importanceService.deleteUserImportance(id, importanceId);
  }
}

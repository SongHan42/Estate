import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ImportanceService } from "./importance.service";
import { GetUserId } from "../auth/get-userId.decorator";
import { User } from "src/user/user.entity";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  @Post() //미완 서비스 완성시키기
  initUserImportance(@GetUserId() id: number): Promise<any> {
    return this.importanceService.initUserImportance(id);
  }

  @Get() //미완 서비스 완성시키기
  getUserImportance(@GetUserId() id: number): Promise<any> {
    return this.importanceService.getUserImportance(id);
  }
}

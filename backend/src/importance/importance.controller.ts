import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ImportanceService } from "./importance.service";

@Controller("importance")
export class ImportanceController {
  constructor(private importanceService: ImportanceService) {}

  //   @Post("/:user-id") //미완 서비스 완성시키기
  //   initUserImportance(
  //     @Param(
  //       "id",
  //       new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //     )
  //     id: number,
  //   ): Promise<any> {
  //     return this.importanceService.initUserImportance(id);
  //   }

  //   @Get("/:user-id") //미완 서비스 완성시키기
  //   getUserImportance(
  //     @Param(
  //       "id",
  //       new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //     )
  //     id: number,
  //   ): Promise<any> {
  //     return this.importanceService.getUserImportance(id);
  //   }
}

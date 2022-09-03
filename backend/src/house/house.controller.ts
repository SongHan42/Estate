import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpStatus,
} from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseListDto } from "./house-list.dto";

@Controller("house")
export class HouseController {
  constructor(private houseService: HouseService) {}

  //   @Get("/:id")
  //   getUserHouseList(
  //     @Param(
  //       "id",
  //       new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //     )
  //     id: number,
  //   ): Promise<HouseListDto[]> {
  //     return this.houseService.getUserHouseList(id);
  //   }
}

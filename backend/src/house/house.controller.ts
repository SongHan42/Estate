import { Controller, Get, UseGuards } from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseListDto } from "./house-list.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUserId } from "src/auth/get-userId.decorator";

@Controller("house")
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserHouseList(@GetUserId() id: number): Promise<HouseListDto[]> {
    return this.houseService.getUserHouseList(id);
  }
}

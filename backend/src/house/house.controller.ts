import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseListDto } from "./house-list.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUserId } from "src/auth/get-userId.decorator";
import { HouseDto } from "./house.dto";
import { House } from "./house.entity";

@Controller("house")
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserHouseList(@GetUserId() id: number): Promise<HouseListDto[]> {
    return this.houseService.getUserHouseList(id);
  }

  @Get("/:house_id")
  @UseGuards(AuthGuard())
  getDetailUserHouse(
    @GetUserId() id: number,
    @Param("house_id", ParseIntPipe) house_id: number,
  ): Promise<House> {
    return this.houseService.getDetailUserHouse(id, house_id);
  }

  @Post()
  @UseGuards(AuthGuard())
  postUserHouse(
    @GetUserId() id: number,
    @Body() HouseDto: HouseDto,
  ): Promise<any> {
    return this.houseService.postUserHouse(id, HouseDto);
  }

  @Patch("/:house_id")
  @UseGuards(AuthGuard())
  editUserHouse(
    @GetUserId() id: number,
    @Param("house_id", ParseIntPipe) house_id: number,
    @Body() houseDto: HouseDto,
  ): Promise<{ isSuccess: true }> {
    return this.houseService.editUserHouse(id, house_id, houseDto);
  }
}

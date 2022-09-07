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
import { HouseListDto } from "./dto/house-list.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUserId } from "src/auth/get-userId.decorator";
import { HouseDto } from "./dto/house.dto";
import { House } from "./house.entity";

@Controller("house")
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUserHouseList(@GetUserId() id: number): Promise<HouseListDto[]> {
    return this.houseService.getUserHouseList(id);
  }

  @Get("/:houseId")
  @UseGuards(AuthGuard())
  getDetailUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
  ): Promise<House> {
    return this.houseService.getDetailUserHouse(id, houseId);
  }

  @Post()
  @UseGuards(AuthGuard())
  postUserHouse(
    @GetUserId() id: number,
    @Body() houseDto: HouseDto,
  ): Promise<HouseDto> {
    return this.houseService.postUserHouse(id, houseDto);
  }

  @Patch("/:houseId")
  @UseGuards(AuthGuard())
  editUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
    @Body() houseDto: HouseDto,
  ): Promise<HouseDto> {
    return this.houseService.editUserHouse(id, houseId, houseDto);
  }
}

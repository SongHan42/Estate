import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Delete,
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
  getUserHouseList(@GetUserId() id: number): Promise<HouseListDto[]> {
    return this.houseService.getUserHouseList(id);
  }

  @Get("/:houseId")
  getDetailUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
  ): Promise<House> {
    return this.houseService.getDetailUserHouse(id, houseId);
  }

  @Post()
  async postUserHouse(
    @GetUserId() id: number,
    @Body() houseDto: HouseDto,
  ): Promise<void> {
    await this.houseService.postUserHouse(id, houseDto);
  }

  @Patch("/:houseId")
  async editUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
    @Body() houseDto: HouseDto,
  ): Promise<void> {
    await this.houseService.editUserHouse(id, houseId, houseDto);
  }

  @Delete("/:houseId")
  async deleteUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
  ): Promise<void> {
    await this.houseService.deleteUserHouse(id, houseId);
  }
}

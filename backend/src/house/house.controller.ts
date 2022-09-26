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
  postUserHouse(
    @GetUserId() id: number,
    @Body() houseDto: HouseDto,
  ): Promise<void> {
    return this.houseService.postUserHouse(id, houseDto);
  }

  @Patch("/:houseId")
  editUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
    @Body() houseDto: HouseDto,
  ): Promise<void> {
    return this.houseService.editUserHouse(id, houseId, houseDto);
  }

  @Delete("/:houseId")
  deleteUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
  ): Promise<void> {
    return this.houseService.deleteUserHouse(id, houseId);
  }

  @Patch("/bookmark/:houseId")
  updateBookmark(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
  ): Promise<{ isSuccess: boolean }> {
    return this.houseService.updateBookmark(id, houseId);
  }
}

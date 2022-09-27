import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { GetUserId } from "src/auth/get-userId.decorator";
import { LikeHouseDto } from "./dto/like-house.dto";
import { LikeHouseService } from "./like-house.service";

@Controller("like-house")
export class LikeHouseController {
  constructor(private likeHouseService: LikeHouseService) {}

  @Get()
  getLikeHouse(@GetUserId() id): Promise<LikeHouseDto[]> {
    return this.likeHouseService.getLikeHouse(id);
  }

  @Post("/:houseId")
  createLikeHouse(
    @GetUserId() userId: number,
    @Param("houseId") houseId: number,
  ): void {
    this.likeHouseService.createLikeHouse(userId, houseId);
  }

  @Delete("/:houseId")
  deleteLikeHouse(@Param("houseId") houseId: number) {
    this.likeHouseService.deleteLikeHouse(houseId);
  }
}

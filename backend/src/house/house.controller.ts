import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseListDto } from "./dto/house-list.dto";
import { GetUserId } from "src/auth/get-userId.decorator";
import { HouseDto } from "./dto/house.dto";
import { House } from "./house.entity";
import { OfferingHouseListDto } from "./dto/offering-house-list.dto";
import { CreateOfferingHouseDto } from "./dto/create-offering-house.dto";
import { UpdateOfferingDto } from "./dto/update-offering.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

const storage = diskStorage({
  destination: "./img",
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

@Controller("house")
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  getUserHouseList(@GetUserId() id: number): Promise<HouseListDto[]> {
    return this.houseService.getUserHouseList(id);
  }

  @Get("/offering")
  getOfferingHouse(@GetUserId() id: number): Promise<OfferingHouseListDto[]> {
    return this.houseService.getOfferingHouse(id);
  }

  @Post("/offering")
  @UseInterceptors(FileInterceptor("img", { storage }))
  createOfferingHouse(
    @GetUserId() id: number,
    createOfferingHouseDto: CreateOfferingHouseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.houseService.createOfferingHouse(
      id,
      createOfferingHouseDto,
      file.filename,
    );
  }

  @Get("/offering/:houseId")
  getOfferingDetail(@Param("houseId") id: number) {
    this.houseService.getOfferingDetail(id);
  }

  @Patch("/offering/:houseId")
  @UseInterceptors(FileInterceptor("img", { storage }))
  updateOffering(
    @Param("houseId") id,
    updateOfferingDto: UpdateOfferingDto,
    @UploadedFile() file: Express.Multer.File,
  ): void {
    this.houseService.updateOffering(id, updateOfferingDto, file.filename);
  }

  @Delete("/offering/:houseId")
  deleteOffering(@Param("houseId") id: number): void {
    this.houseService.deleteOffering(id);
  }

  @Get("/:houseId")
  getDetailUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
  ): Promise<House> {
    return this.houseService.getDetailUserHouse(id, houseId);
  }

  @Post()
  @UseInterceptors(FileInterceptor("img", { storage }))
  postUserHouse(
    @GetUserId() id: number,
    @Body() houseDto: HouseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    if (file)
      return this.houseService.postUserHouse(id, houseDto, file.filename);
    else return this.houseService.postUserHouse(id, houseDto, "");
  }

  @Patch("/:houseId")
  @UseInterceptors(FileInterceptor("img", { storage }))
  editUserHouse(
    @GetUserId() id: number,
    @Param("houseId", ParseIntPipe) houseId: number,
    @Body() houseDto: HouseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    return this.houseService.editUserHouse(
      id,
      houseId,
      houseDto,
      file.filename,
    );
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
  ): Promise<void> {
    return this.houseService.updateBookmark(id, houseId);
  }
}

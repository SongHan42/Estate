import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { House } from "./house.entity";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HouseListDto } from "./dto/house-list.dto";
import { User } from "src/user/user.entity";
import { HouseDto } from "./dto/house.dto";
import { Grade } from "src/grade/grade.entity";
import { Evaluation } from "src/evaluation/evaluation.entity";
import { EvaluationService } from "src/evaluation/evaluation.service";
import { OfferingHouseListDto } from "./dto/offering-house-list.dto";
import { CreateOfferingHouseDto } from "./dto/create-offering-house.dto";
import { OfferingHouseDetailDto } from "./dto/offering-house-detail.dto";
import { UpdateOfferingDto } from "./dto/update-offering.dto";
import { join } from "path";
import { HouseDetailDto } from "./dto/house-detail.dto";
import { SearchHouseDto } from "./dto/search-house.dto";

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,

    private evaluationService: EvaluationService,
  ) {}

  async getUserHouseList(id: number): Promise<HouseListDto[]> {
    const houses: House[] = await this.houseRepository.find({
      where: { user: { id }, isOffering: false },
    });

    const houseList: HouseListDto[] = [];

    for await (const house of houses) {
      const evaluation: Evaluation = await this.evaluationRepository.findOne({
        where: { house: { id: house.id } },
      });

      const grade: Grade[] = await this.gradeRepository.find({
        where: { evaluation: { id: evaluation.id } },
      });

      houseList.push(new HouseListDto(house, grade, evaluation.isBookmark));
    }
    return houseList;
  }

  async postUserHouse(
    id: number,
    houseDto: HouseDto,
    filename: string,
  ): Promise<void> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    if (houseDto.title === "") throw new BadRequestException(`title need!`);
    if (houseDto.tradeType === null)
      throw new BadRequestException(`type need!`);

    const house: House = this.houseRepository.create({
      title: houseDto.title,
      houseType: houseDto.houseType,
      tradeType: houseDto.tradeType,
      area: houseDto.area,
      price: houseDto.price,
      deposit: houseDto.deposit,
      rent: houseDto.rent,
      maintenanceFee: houseDto.maintenanceFee,
      address: houseDto.address,
      detailedAddress: houseDto.detailedAddress,
      floor: houseDto.floor,
      roomNum: houseDto.roomNum,
      img: filename,
      user,
    });
    await house.save();

    await this.evaluationService.createEvaluation(
      user,
      house,
      houseDto.memo,
      houseDto.grade,
    );
  }

  async getDetailUserHouse(
    id: number,
    houseId: number,
  ): Promise<HouseDetailDto> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId },
      relations: ["evaluation", "evaluation.grade"],
    });
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    const houseDetailDto: HouseDetailDto = new HouseDetailDto(
      house,
      house.evaluation[0].grade,
    );
    return houseDetailDto;
  }

  async editUserHouse(
    id: number,
    houseId: number,
    houseDto: HouseDto,
    filename: string,
  ): Promise<void> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId },
      relations: ["evaluation"],
    });
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    if (houseDto.title === "") throw new BadRequestException(`title need!`);
    if (houseDto.tradeType === null)
      throw new BadRequestException(`type need!`);

    for await (const gradeDto of houseDto.grade) {
      const find: Grade = await this.gradeRepository.findOne({
        where: { id: gradeDto.id },
      });
      if (find) {
        find.title = gradeDto.title;
        find.star = gradeDto.star;
        await find.save();
      }
    }

    if (filename) {
      const fs = require("fs");

      const path = join(__dirname, "..", "..", "img");
      fs.unlink(path, () => {});
      house.img = filename;
    }
    house.title = houseDto.title;
    house.houseType = houseDto.houseType;
    house.tradeType = houseDto.tradeType;
    house.area = houseDto.area;
    house.price = houseDto.price;
    house.deposit = houseDto.deposit;
    house.rent = houseDto.rent;
    house.maintenanceFee = houseDto.maintenanceFee;
    house.address = houseDto.address;
    house.floor = houseDto.floor;
    house.roomNum = houseDto.roomNum;
    house.evaluation[0].memo = houseDto.memo;
    await house.save();
  }

  /////////////// offering

  async deleteUserHouse(id: number, houseId: number): Promise<void> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId, user: { id: user.id } },
    });
    if (!house) throw new NotFoundException(`삭제할 house를 찾을 수 없음`);

    const fs = require("fs");
    const path = join(__dirname, "..", "..", "img", house.img);
    fs.unlink(path, () => {});

    await this.houseRepository.remove(house);
  }

  async getOfferingHouse(id: number): Promise<OfferingHouseListDto[]> {
    const houses: House[] = await this.houseRepository.find({
      where: { user: { id }, isOffering: true },
    });

    const offeringHoustListDto: OfferingHouseListDto[] = [];
    houses.forEach((house) => {
      offeringHoustListDto.push(new OfferingHouseListDto(house));
    });
    return offeringHoustListDto;
  }

  async createOfferingHouse(
    id: number,
    createOfferingHouseDto: CreateOfferingHouseDto,
    filename: string,
  ) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    const house: House = this.houseRepository.create({
      title: createOfferingHouseDto.title,
      houseType: createOfferingHouseDto.houseType,
      tradeType: createOfferingHouseDto.tradeType,
      area: createOfferingHouseDto.area,
      price: createOfferingHouseDto.price,
      deposit: createOfferingHouseDto.deposit,
      rent: createOfferingHouseDto.rent,
      maintenanceFee: createOfferingHouseDto.maintenanceFee,
      address: createOfferingHouseDto.address,
      detailedAddress: createOfferingHouseDto.detailedAddress,
      floor: createOfferingHouseDto.floor,
      roomNum: createOfferingHouseDto.roomNum,
      description: createOfferingHouseDto.description,
      img: filename,
      isOffering: true,
      user,
    });
    await house.save();
  }

  async getOfferingDetail(id: number): Promise<OfferingHouseDetailDto> {
    const house: House = await this.houseRepository.findOne({ where: { id } });
    const evaluation: Evaluation[] = await this.evaluationRepository.find({
      where: { house: { id } },
      relations: ["user", "grade"],
    });

    const offeringHouseDetailDto: OfferingHouseDetailDto =
      new OfferingHouseDetailDto(house, evaluation);
    return offeringHouseDetailDto;
  }

  async updateOffering(
    id: number,
    updateOfferingDto: UpdateOfferingDto,
    filename: string,
  ): Promise<void> {
    const house: House = await this.houseRepository.findOne({
      where: { id },
    });
    if (filename) {
      const fs = require("fs");

      const path = join(__dirname, "..", "..", "img", house.img);
      fs.unlink(path, () => {});
      house.img = filename;
    }

    house.houseType = updateOfferingDto.houseType;
    house.tradeType = updateOfferingDto.tradeType;
    house.area = updateOfferingDto.area;
    house.price = updateOfferingDto.price;
    house.deposit = updateOfferingDto.deposit;
    house.rent = updateOfferingDto.rent;
    house.maintenanceFee = updateOfferingDto.maintenanceFee;
    house.address = updateOfferingDto.address;
    house.floor = updateOfferingDto.floor;
    house.roomNum = updateOfferingDto.roomNum;
    house.description = updateOfferingDto.description;
    await house.save();
  }

  async deleteOffering(id: number): Promise<void> {
    const house: House = await this.houseRepository.findOne({ where: { id } });

    const fs = require("fs");

    const path = join(__dirname, "..", "..", "img", house.img);
    fs.unlink(path, () => {});

    await house.remove();
  }
  ////////////////

  async searchHouse(id: number, address: string): Promise<SearchHouseDto[]> {
    const houses: House[] = await this.houseRepository.find({
      where: { address: Like(`%${address}%`), isOffering: true },
      //      relations: ["likeHouse"],
    });

    const searchHouseDto: SearchHouseDto[] = [];
    houses.forEach((house) => {
      searchHouseDto.push(house);
    });
    return searchHouseDto;
  }

  async updateBookmark(id: number, houseId: number) {
    await this.evaluationService.updateBookmark(id, houseId);
  }
}

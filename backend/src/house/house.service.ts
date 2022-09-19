import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { House } from "./house.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HouseListDto } from "./dto/house-list.dto";
import { User } from "src/user/user.entity";
import { HouseDto } from "./dto/house.dto";
import { GradeService } from "src/grade/grade.service";
import { Grade } from "src/grade/grade.entity";

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    private gradeService: GradeService,
  ) {}

  async getUserHouseList(id: number): Promise<HouseListDto[]> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const houses: House[] = await this.houseRepository.find({
      where: {
        user: {
          id: id,
        },
      },
      relations: ["grade"],
      order: {
        isBookmark: "DESC",
        id: "ASC",
      },
    });

    const houseListDto: HouseListDto[] = [];
    houses.forEach((house) => {
      houseListDto.push(new HouseListDto(house));
    });

    return houseListDto;
  }

  async getDetailUserHouse(id: number, houseId: number): Promise<House> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId },
      relations: ["grade"],
      order: {
        grade: {
          title: "ASC",
        },
      },
    });
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    return house;
  }

  async postUserHouse(id: number, houseDto: HouseDto): Promise<void> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    if (houseDto.title === "") throw new BadRequestException(`title need!`);
    if (houseDto.type === null) throw new BadRequestException(`type need!`);

    const house: House = this.houseRepository.create({
      title: houseDto.title,
      type: houseDto.type,
      area: houseDto.area,
      price: houseDto.price,
      deposit: houseDto.deposit,
      rent: houseDto.rent,
      maintenanceFee: houseDto.maintenanceFee,
      memo: houseDto.memo,
      user,
    });
    await house.save();

    this.gradeService.createDefaultGrade(id, house, houseDto.grade);
  }

  async editUserHouse(
    id: number,
    houseId: number,
    houseDto: HouseDto,
  ): Promise<void> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOneById(houseId);
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    if (houseDto.title === "") throw new BadRequestException(`title need!`);
    if (houseDto.type === null) throw new BadRequestException(`type need!`);

    for await (const gradeDto of houseDto.grade) {
      const find: Grade = await this.gradeRepository.findOneById(gradeDto.id);
      if (find) {
        find.title = gradeDto.title;
        find.star = gradeDto.star;
        await find.save();
      }
    }
    const pushGrade: Grade[] = await this.gradeRepository.findBy({
      house: { id: house.id },
    });
    house.title = houseDto.title;
    house.type = houseDto.type;
    house.area = houseDto.area;
    house.price = houseDto.price;
    house.deposit = houseDto.deposit;
    house.rent = houseDto.rent;
    house.maintenanceFee = houseDto.maintenanceFee;
    house.grade = pushGrade;
    house.memo = houseDto.memo;
    await house.save();
  }

  async deleteUserHouse(id: number, houseId: number): Promise<void> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId, user: { id: user.id } },
    });
    if (!house) throw new NotFoundException(`삭제할 house를 찾을 수 없음`);
    await this.houseRepository.remove(house);
  }

  async updateBookmark(
    id: number,
    houseId: number,
  ): Promise<{ isSuccess: boolean }> {
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId, user: { id } },
    });
    if (!house) throw new NotFoundException();
    house.isBookmark = !house.isBookmark;
    await house.save();
    return { isSuccess: true };
  }
}

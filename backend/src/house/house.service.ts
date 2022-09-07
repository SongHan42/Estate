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
    const house: House = await this.houseRepository.findOneById(houseId);
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    return house;
  }

  async postUserHouse(id: number, houseDto: HouseDto): Promise<any> {
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
      maintenance_fee: houseDto.maintenance_fee,
      user,
    });
    await house.save();

    this.gradeService.createDefaultGrade(id, house);

    return houseDto;
  }

  async editUserHouse(
    id: number,
    houseId: number,
    houseDto: HouseDto,
  ): Promise<HouseDto> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOneById(houseId);
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    if (houseDto.title === "") throw new BadRequestException(`title need!`);
    if (houseDto.type === null) throw new BadRequestException(`type need!`);

    for await (const gradeDto of houseDto.gradeDto) {
      const find: Grade = await this.gradeRepository.findOneById(gradeDto.id);
      if (find) {
        find.title = gradeDto.title;
        find.star = gradeDto.star;
        find.memo = gradeDto.memo;
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
    house.maintenance_fee = houseDto.maintenance_fee;
    house.grade = pushGrade;
    house.save();

    return houseDto;
  }
}

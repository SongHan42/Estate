import { Injectable, NotFoundException } from "@nestjs/common";
import { House } from "./house.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HouseListDto } from "./house-list.dto";
import { User } from "src/user/user.entity";
import { HouseDto } from "./house.dto";
import { GradeService } from "src/grade/grade.service";
import { number } from "joi";

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async getDetailUserHouse(id: number, house_id: number): Promise<House> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOneById(house_id);
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    return house;
  }

  //새로운 집 만들기!
  async postUserHouse(id: number, HouseDto: HouseDto): Promise<any> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    //title,type 비지 않는지 확인해야함!
    const house: House = this.houseRepository.create({
      title: HouseDto.title,
      type: HouseDto.type,
      area: HouseDto.area,
      price: HouseDto.price,
      deposit: HouseDto.deposit,
      rent: HouseDto.rent,
      maintenance_fee: HouseDto.maintenance_fee,
      // grade: HouseDto.grade, //잘 들어가는지 확인 dto로 안빼도 괜찮은가?
    });
    await house.save();

    this.gradeService.createDefaultGrade(id, house);

    return { isSuccess: true };
  }

  async editUserHouse(
    id: number,
    house_id: number,
    houseDto: HouseDto,
  ): Promise<{ isSuccess: true }> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    const house: House = await this.houseRepository.findOneById(house_id);
    if (!house) throw new NotFoundException(`집을 찾을 수 없음`);
    //title,type 비지 않는지 확인해야함!

    house.title = houseDto.title;
    house.type = houseDto.type;
    house.area = houseDto.area;
    house.price = houseDto.price;
    house.deposit = houseDto.deposit;
    house.rent = houseDto.rent;
    house.maintenance_fee = houseDto.maintenance_fee;
    //grade 여기서 변경??
    house.grade = houseDto.grade;

    house.save();
    return { isSuccess: true };
  }
}

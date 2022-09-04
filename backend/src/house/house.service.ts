import { Injectable, NotFoundException } from "@nestjs/common";
import { House } from "./house.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HouseListDto } from "./house-list.dto";
import { User } from "src/user/user.entity";
import { PostHouseDto } from "./post-house.dto";
import { GradeService } from "src/grade/grade.service";

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private gradeService: GradeService,
  ) {}

  // 작동 안함
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

  //새로운 집 만들기!
  async postUserHouse(id: number, postHouseDto: PostHouseDto): Promise<any> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const house: House = this.houseRepository.create({
      title: postHouseDto.title,
      type: postHouseDto.type,
      area: postHouseDto.area,
      price: postHouseDto.price,
      deposit: postHouseDto.deposit,
      rent: postHouseDto.rent,
      maintenance_fee: postHouseDto.maintenance_fee,
      // grade: postHouseDto.grade, //잘 들어가는지 확인 dto로 안빼도 괜찮은가?
    });
    await house.save();

    this.gradeService.createDefaultGrade(id, house);

    return { isSuccess: true };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { House } from "./house.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HouseListDto } from "./house-list.dto";
import { User } from "src/user/user.entity";
@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      relations: ["user"], //?
    });

    const houseListDto: HouseListDto[] = [];
    houses.forEach((house) => {
      houseListDto.push(new HouseListDto(house));
    });

    return houseListDto;
  }
}

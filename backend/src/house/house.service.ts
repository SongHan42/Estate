import { Injectable } from "@nestjs/common";
import { House } from "./house.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HouseListDto } from "./house-list.dto";
@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  //   async getUserHouseList(id: number): Promise<HouseListDto[]> {
  //     // const user: User = await this
  //     const houseList: House[] = await this.houseRepository.find({
  //       where: { user: id },
  //       relations: ["user"], //?
  //     });
  //     return houseList;
  //   }
}

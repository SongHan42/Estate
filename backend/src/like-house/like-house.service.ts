import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { House } from "src/house/house.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { LikeHouseDto } from "./dto/like-house.dto";
import { LikeHouse } from "./like-house.entity";

@Injectable()
export class LikeHouseService {
  constructor(
    @InjectRepository(LikeHouse)
    private likeHouseRepository: Repository<LikeHouse>,
    @InjectRepository(House)
    private houseRepository: Repository<House>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getLikeHouse(id: number): Promise<LikeHouseDto[]> {
    const likeHouses: LikeHouse[] = await this.likeHouseRepository.find({
      where: { user: { id } },
      relations: ["house"],
    });

    const likeHouseDto: LikeHouseDto[] = [];
    likeHouses.forEach((likeHouse) => {
      likeHouseDto.push(new LikeHouseDto(likeHouse.house));
    });
    return likeHouseDto;
  }

  async createLikeHouse(userId: number, houseId: number): Promise<void> {
    const house: House = await this.houseRepository.findOne({
      where: { id: houseId },
    });
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });
    const likeHouse: LikeHouse = this.likeHouseRepository.create({
      house,
      user,
    });

    await likeHouse.save();
  }

  async deleteLikeHouse(houseId: number): Promise<void> {
    await (
      await this.likeHouseRepository.findOne({ where: { id: houseId } })
    ).remove();
  }
}

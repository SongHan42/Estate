import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { ImportanceDto } from "./dto/importance.dto";
import { ReturnImportanceDto } from "./dto/return-importance.dto";

@Injectable()
export class ImportanceService {
  constructor(
    @InjectRepository(Importance)
    private importanceRepository: Repository<Importance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserImportance(id: number): Promise<Importance[]> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const importance: Importance[] = await this.importanceRepository.findBy({
      user: {
        id: user.id,
      },
    });

    return importance;
  }

  async createDefaultImportance(id: number) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    let titles: string[] = ["수압이 좋나요?", "채광이 좋나요?", "가가가"]; //정렬 잘된다
    titles.sort();

    for await (const title of titles) {
      const importance: Importance = this.importanceRepository.create({
        title,
        user,
      });
      await importance.save();
    }
  }
  //정렬에 맞게 하기!!
  async editUserImportance(
    id: number,
    importanceDtoList: ImportanceDto[],
  ): Promise<ReturnImportanceDto[]> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const returnImportanceDto: ReturnImportanceDto[] = [];
    for await (const importanceDto of importanceDtoList) {
      let importance: Importance;
      if (importanceDto.id === undefined) {
        //0으로 못보내줄듯? 수요일날 이야기
        importance = this.importanceRepository.create({
          title: importanceDto.title,
          rating: importanceDto.rating,
          user,
        });
      } else {
        importance = await this.importanceRepository.findOne({
          where: { id: importanceDto.id },
          relations: ["user"],
        });
        if (!importance) throw new NotFoundException();
        importance.title = importanceDto.title;
        importance.rating = importanceDto.rating;
      }
      await importance.save();
      returnImportanceDto.push(new ReturnImportanceDto(importance));
    }
    returnImportanceDto.sort((a, b) => a.rating - b.rating);
    return returnImportanceDto;
  }
}

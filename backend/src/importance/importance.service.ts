import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { ImportanceDto } from "./importance.dto";

@Injectable()
export class ImportanceService {
  constructor(
    @InjectRepository(Importance)
    private importanceRepository: Repository<Importance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserImportance(id: number): Promise<ImportanceDto[]> {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const importances: Importance[] = await this.importanceRepository.findBy({
      user: {
        id: user.id,
      },
    });

    const importancedto: ImportanceDto[] = [];
    importances.forEach((importance) => {
      importancedto.push(new ImportanceDto(importance));
    });

    return importancedto;
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

  //실험 필요 (성공 응답 본문 수정)
  async initUserImportance(id: number, importance: ImportanceDto) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    if (importance.title === "")
      throw new BadRequestException(`title을 설정해 주세요`);

    //존재하는 중요도 빼줘야할까?
    const add_importance: Importance = this.importanceRepository.create({
      title: importance.title,
      rating: importance.rating,
      user,
    });
    await add_importance.save();
    return { isSuccess: true };
  }

  async editUserImportance(id: number, importance: ImportanceDto) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);
    if (importance.title === "")
      throw new BadRequestException(`title을 설정해 주세요`);

    const find: Importance = await this.importanceRepository.findOneBy({
      user: {
        id: user.id,
      },
      title: importance.title,
    });

    if (!find) throw new BadRequestException(`수정할 importance를 찾지 못함`);

    find.rating = importance.rating;
    await find.save();
    return { isSuccess: true };
  }
}

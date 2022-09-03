import { Injectable, NotFoundException } from "@nestjs/common";
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
  async initUserImportance(id: number, edit: ImportanceDto) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const find: Importance = await this.importanceRepository.findOneBy({
      user: {
        id: user.id,
      },
      title: edit.title,
    });

    if (!find) {
      const importance: Importance = this.importanceRepository.create({
        title: edit.title,
        rating: edit.rating,
        user,
      });
      await importance.save();
    } else {
      find.rating = edit.rating;
      await find.save();
    }
  }

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
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Importance } from "./importance.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable()
export class ImportanceService {
  constructor(
    @InjectRepository(Importance)
    private importanceRepository: Repository<Importance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async createDefaultImportance(id: number) {
    const user: User = await this.userRepository.findOneById(id);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    let titles: string[] = ["수압이 좋나요?", "채광이 좋나요?", "가가가"]; //정렬 확인
    titles.sort();

    for await (const title of titles) {
      const importance: Importance = this.importanceRepository.create({
        title,
        user,
      });
      await importance.save();
    }
  }

  async initUserImportance(id: number) {
    await this.createDefaultImportance(id);
  }
  async getUserImportance(id: number) {
    const user: User = await this.userRepository.findOneById(id);
    // const importance: Importance[] = await this.importanceRepository.findBy({
    //   user,
    // });
    const importance: Importance = await this.importanceRepository.findOneBy({
      user,
    });
    // return importance;
  }
}

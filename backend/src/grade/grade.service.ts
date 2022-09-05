import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { House } from "src/house/house.entity";
import { Importance } from "src/importance/importance.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Grade } from "./grade.entity";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(Importance)
    private importanceRepository: Repository<Importance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createDefaultGrade(userId: number, house: House) {
    const user: User = await this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    const importances: Importance[] = await this.importanceRepository.findBy({
      user: {
        id: user.id,
      },
    });
    //순서에 맞게!
    for await (const importance of importances) {
      const grade: Grade = this.gradeRepository.create({
        title: importance.title,
        house,
      });
      await grade.save();
    }
  }
}

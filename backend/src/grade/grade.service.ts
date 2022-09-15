import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { House } from "src/house/house.entity";
import { Importance } from "src/importance/importance.entity";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Grade } from "./grade.entity";
import { GradeDto } from "./grade.dto";

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

  async createDefaultGrade(userId: number, house: House, grades: GradeDto[]) {
    const user: User = await this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundException(`유저를 찾을 수 없음`);

    // grade.sort((a, b) => a.rating - b.rating);
    for await (const grade of grades) {
      const add_grade: Grade = this.gradeRepository.create({
        rating: grade.rating,
        title: grade.title,
        house,
      });
      await add_grade.save();
    }
  }
}

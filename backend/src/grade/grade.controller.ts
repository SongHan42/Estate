import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Grade } from "./grade.entity";
import { GradeService } from "./grade.service";

@Controller("grade")
export class GradeController {
  constructor(private gradeService: GradeService) {}

  //   @Post()
  //   postHouseGrade(
  //     @Body("house_id") house_id: number,
  //     @Body("grades") grades: Grade[],
  //   ) {
  //     // return await this.gradeService.postHouseGrade(house_id, grades);
  //     //grades ck need!
  //   }
}

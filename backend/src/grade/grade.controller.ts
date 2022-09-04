import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GradeDto } from "./grade.dto";
import { GradeService } from "./grade.service";

@Controller("grade")
export class GradeController {
  constructor(private gradeService: GradeService) {}

  //   @Post()
  //   postHouseGrade(
  //     @Body("house_id") house_id: number,
  //     @Body("grades") gradeDto: GradeDto,
  //   ) {
  //     return this.gradeService.postHouseGrade(house_id, gradeDto);
  //     //grades ck need!
  //   }
}

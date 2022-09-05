import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GradeDto } from "./grade.dto";
import { GradeService } from "./grade.service";

@Controller("grade")
export class GradeController {
  constructor(private gradeService: GradeService) {}
}

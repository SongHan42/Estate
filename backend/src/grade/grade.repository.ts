import { EntityRepository, Repository } from 'typeorm';
import { Grade } from './grade.entity';

@EntityRepository(Grade)
export class GradeRepository extends Repository<Grade> {}

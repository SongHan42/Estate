import { EntityRepository, Repository } from 'typeorm';
import { Importance } from './importance.entity';

@EntityRepository(Importance)
export class ImportanceRepository extends Repository<Importance> {}

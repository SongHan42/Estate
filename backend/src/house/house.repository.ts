import { EntityRepository, Repository } from 'typeorm';
import { House } from './house.entity';

@EntityRepository(House)
export class HouseRepository extends Repository<House> {}

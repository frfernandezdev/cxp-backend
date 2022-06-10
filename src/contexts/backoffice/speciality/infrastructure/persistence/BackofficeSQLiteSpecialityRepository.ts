import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteraConverter';
import { Repository } from 'typeorm';
import { BackofficeSpeciality } from '../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';

@Injectable()
export class BackofficeSQLiteSpecialityRepository {
  private criteriaConverter: SQLiteCriteriaConverter =
    new SQLiteCriteriaConverter();

  constructor(
    @InjectRepository(SpecialityEntity)
    private readonly repository: Repository<SpecialityEntity>,
  ) {}

  async save(method: BackofficeSpeciality): Promise<void> {
    const { id, name } = method.toPrimitives();
    const entity = new SpecialityEntity();

    entity.id = id;
    entity.name = name;

    await this.repository.save(entity);
  }

  async findById(id: BackofficeSpecialityId): Promise<BackofficeSpeciality> {
    const entity = await this.repository.findOne({ id: id.value });

    return BackofficeSpeciality.fromPrimitives({
      id: entity.id,
      name: entity.name,
    });
  }

  async findOne(criteria: Criteria): Promise<BackofficeSpeciality> {
    const options = this.criteriaConverter.convert(criteria);
    const entity = await this.repository.findOne(options);

    return BackofficeSpeciality.fromPrimitives({
      id: entity.id,
      name: entity.name,
    });
  }

  async find(criteria: Criteria): Promise<BackofficeSpeciality[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficeSpeciality.fromPrimitives({
        id: entity.id,
        name: entity.name,
      }),
    );
  }

  async findAll(): Promise<BackofficeSpeciality[]> {
    const entities = await this.repository.find();

    return entities.map((entity) =>
      BackofficeSpeciality.fromPrimitives({
        id: entity.id,
        name: entity.name,
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async remove(ids: string[]): Promise<void> {
    const entities = await this.repository.find({
      where: ids.map((id) => ({ id })),
    });
    await this.repository.remove(entities);
  }

  async disabled(ids: string[]): Promise<void> {
    let entities = await this.repository.find({
      where: ids.map((id) => ({ id })),
    });

    entities = entities.map((item) => {
      item.disabled = true;
      return item;
    });

    await this.repository.save(entities);
  }

  async enabled(ids: string[]): Promise<void> {
    let entities = await this.repository.find({
      where: ids.map((id) => ({ id })),
    });

    entities = entities.map((item) => {
      item.disabled = false;
      return item;
    });

    await this.repository.save(entities);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteraConverter';
import { Repository } from 'typeorm';
import { BackofficeMethod } from '../../domain/BackofficeMethod';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';

@Injectable()
export class BackofficeSQLiteMethodRepository {
  private criteriaConverter: SQLiteCriteriaConverter =
    new SQLiteCriteriaConverter();

  constructor(
    @InjectRepository(MethodEntity)
    private readonly repository: Repository<MethodEntity>,
  ) {}

  async save(method: BackofficeMethod): Promise<void> {
    const { id, name } = method.toPrimitives();
    const entity = new MethodEntity();

    entity.id = id;
    entity.name = name;

    await this.repository.save(entity);
  }

  async findById(id: BackofficeMethodId): Promise<BackofficeMethod> {
    const entity = await this.repository.findOne({ id: id.value });

    return BackofficeMethod.fromPrimitives({
      id: entity.id,
      name: entity.name,
    });
  }

  async findOne(criteria: Criteria): Promise<BackofficeMethod> {
    const options = this.criteriaConverter.convert(criteria);
    const entity = await this.repository.findOne(options);

    return BackofficeMethod.fromPrimitives({
      id: entity.id,
      name: entity.name,
    });
  }

  async find(criteria: Criteria): Promise<BackofficeMethod[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficeMethod.fromPrimitives({
        id: entity.id,
        name: entity.name,
      }),
    );
  }

  async findAll(): Promise<BackofficeMethod[]> {
    const entities = await this.repository.find();

    return entities.map((entity) =>
      BackofficeMethod.fromPrimitives({
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

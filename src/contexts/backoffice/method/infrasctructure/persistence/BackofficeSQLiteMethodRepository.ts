import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteriaConverter';
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

  async findById({ value }: BackofficeMethodId): Promise<BackofficeMethod> {
    const entity = await this.repository.findOneBy({ id: value });

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

  async findAll(criteria: Criteria): Promise<BackofficeMethod[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficeMethod.fromPrimitives({
        id: entity.id,
        name: entity.name,
      }),
    );
  }

  async delete({ value }: BackofficeMethodId): Promise<void> {
    await this.repository.delete({ id: value });
  }

  async remove(methodsId: BackofficeMethodId[]): Promise<void> {
    const entities = await this.repository.findBy(
      methodsId.map(({ value }) => ({ id: value })),
    );
    await this.repository.remove(entities);
  }

  async disabled({ value }: BackofficeMethodId): Promise<void> {
    const entity = await this.repository.findOneBy({
      id: value,
    });

    entity.disabled = true;

    await this.repository.save(entity);
  }

  async enabled({ value }: BackofficeMethodId): Promise<void> {
    const entity = await this.repository.findOneBy({
      id: value,
    });

    entity.disabled = false;

    await this.repository.save(entity);
  }
}

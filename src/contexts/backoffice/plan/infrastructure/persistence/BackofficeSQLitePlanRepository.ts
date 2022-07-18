import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteriaConverter';
import { Repository } from 'typeorm';
import { BackofficePlan } from '../../domain/BackofficePlan';
import { BackofficePlanId } from '../../domain/BackofficePlanId';

@Injectable()
export class BackofficeSQLitePlanRepository {
  private criteriaConverter: SQLiteCriteriaConverter =
    new SQLiteCriteriaConverter();

  constructor(
    @InjectRepository(PlanEntity)
    private readonly repository: Repository<PlanEntity>,
  ) {}

  async save(plan: BackofficePlan): Promise<void> {
    const { id, price, duration, coin } = plan.toPrimitives();
    const entity = new PlanEntity();

    entity.id = id;
    entity.price = price;
    entity.duration = duration;
    entity.coin = coin;

    await this.repository.save(entity);
  }

  async findById({ value }: BackofficePlanId): Promise<BackofficePlan> {
    const entity = await this.repository.findOneBy({ id: value });

    return BackofficePlan.fromPrimitives({
      id: entity.id,
      price: entity.price,
      duration: entity.duration,
      coin: entity.coin,
    });
  }

  async findOne(criteria: Criteria): Promise<BackofficePlan> {
    const options = this.criteriaConverter.convert(criteria);
    const entity = await this.repository.findOne(options);

    return BackofficePlan.fromPrimitives({
      id: entity.id,
      price: entity.price,
      duration: entity.duration,
      coin: entity.coin,
    });
  }

  async find(criteria: Criteria): Promise<BackofficePlan[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficePlan.fromPrimitives({
        id: entity.id,
        price: entity.price,
        duration: entity.duration,
        coin: entity.coin,
      }),
    );
  }

  async findAll(criteria: Criteria): Promise<BackofficePlan[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficePlan.fromPrimitives({
        id: entity.id,
        price: entity.price,
        duration: entity.duration,
        coin: entity.coin,
      }),
    );
  }

  async delete({ value }: BackofficePlanId): Promise<void> {
    await this.repository.delete({ id: value });
  }

  async remove(methodsId: BackofficePlanId[]): Promise<void> {
    const entities = await this.repository.findBy(
      methodsId.map(({ value }) => ({ id: value })),
    );
    await this.repository.remove(entities);
  }

  async disabled({ value }: BackofficePlanId): Promise<void> {
    const entity = await this.repository.findOneBy({
      id: value,
    });

    entity.disabled = true;

    await this.repository.save(entity);
  }

  async enabled({ value }: BackofficePlanId): Promise<void> {
    const entity = await this.repository.findOneBy({
      id: value,
    });

    entity.disabled = false;

    await this.repository.save(entity);
  }
}

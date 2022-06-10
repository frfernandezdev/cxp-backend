import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import {
  FilterOperator,
  Operator,
} from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Connection } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanId } from '../../../domain/BackofficePlanId';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../BackofficeSQLitePlanRepository';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficePlanMock = () =>
  new BackofficePlan(
    BackofficePlanIdFixture.random(),
    BackofficePlanPriceFixture.random(),
    BackofficePlanDurationFixture.random(),
    BackofficePlanCoinFixture.random(),
  );

describe('BackofficeSQLiteMethodRepository', () => {
  let database: Connection;
  let repository: BackofficeSQLitePlanRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLitePlanRepository],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    repository = moduleRef.get<BackofficeSQLitePlanRepository>(
      BackofficeSQLitePlanRepository,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#save', () => {
    it('should create a new method', async () => {
      const method = backofficePlanMock();
      const raw = method.toPrimitives();

      await repository.save(method);

      const entity = await database.manager.findOne(PlanEntity, {
        id: raw.id,
      });

      expect(entity).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: entity.id,
        price: entity.price,
        duration: entity.duration,
        coin: entity.coin,
      });
    });
  });

  describe('#findById', () => {
    let plan: PlanEntity;

    beforeEach(async () => {
      plan = new PlanEntity();
      const { id, price, duration, coin } = backofficePlanMock().toPrimitives();

      plan.id = id;
      plan.price = price;
      plan.duration = duration;
      plan.coin = coin;

      await database.manager.save(PlanEntity, plan);
    });

    it('should find a plan by id', async () => {
      const result = await repository.findById(new BackofficePlanId(plan.id));
      const raw = result.toPrimitives();

      expect(plan).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: plan.id,
        price: plan.price,
        duration: plan.duration,
        coin: plan.coin,
      });
    });
  });

  describe('#findOne', () => {
    let plan: PlanEntity;

    beforeEach(async () => {
      plan = new PlanEntity();
      const { id, price, duration, coin } = backofficePlanMock().toPrimitives();

      plan.id = id;
      plan.price = price;
      plan.duration = duration;
      plan.coin = coin;

      await database.manager.save(PlanEntity, plan);
    });

    it('should find a plan by criteria', async () => {
      const filter = new Filter(
        new FilterField('price'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(`${plan.price}`),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);
      const result = await repository.findOne(criteria);
      const raw = result.toPrimitives();

      expect(result).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: plan.id,
        price: plan.price,
        duration: plan.duration,
        coin: plan.coin,
      });
    });
  });

  describe('#findALl', () => {
    const plans: PlanEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (plans[i] = new PlanEntity());
        const { id, price, duration, coin } =
          backofficePlanMock().toPrimitives();

        item.id = id;
        item.price = price;
        item.duration = duration;
        item.coin = coin;

        await database.manager.save(PlanEntity, item);
      }
    });

    it('should find all plan', async () => {
      const result = await repository.findAll();

      expect(result).toHaveLength(plans.length);
    });
  });

  describe('#delete', () => {
    let plan: PlanEntity;

    beforeEach(async () => {
      plan = new PlanEntity();
      const { id, price, duration, coin } = backofficePlanMock().toPrimitives();

      plan.id = id;
      plan.price = price;
      plan.duration = duration;
      plan.coin = coin;

      await database.manager.save(PlanEntity, plan);
    });

    it('should delete a admin', async () => {
      await repository.delete(plan.id);

      const result = await database.manager.findOne(PlanEntity, {
        id: plan.id,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('#remove', () => {
    const plans: PlanEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (plans[i] = new PlanEntity());
        const { id, price, duration, coin } =
          backofficePlanMock().toPrimitives();

        item.id = id;
        item.price = price;
        item.duration = duration;
        item.coin = coin;

        await database.manager.save(PlanEntity, item);
      }
    });

    it('should remove plan', async () => {
      const ids = plans.map((item) => item.id);
      await repository.remove(ids);

      const results = await database.manager.findByIds(
        PlanEntity,
        plans.map((item) => item.id),
      );

      expect(results).toHaveLength(0);
      results.map((item) => expect(plans).not.toContain(item));
    });
  });

  describe('#disabled', () => {
    const plans: PlanEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (plans[i] = new PlanEntity());
        const { id, price, duration, coin } =
          backofficePlanMock().toPrimitives();

        item.id = id;
        item.price = price;
        item.duration = duration;
        item.coin = coin;

        await database.manager.save(PlanEntity, item);
      }
    });

    it('should disabled plan', async () => {
      const ids = plans.map((item) => item.id);

      await repository.disabled(ids);

      const result = await database.manager.findByIds(
        PlanEntity,
        plans.map((item) => item.id),
      );

      expect(result).toHaveLength(plans.length);
      result.map((item) => expect(item.disabled).toBeTruthy());
    });
  });
});

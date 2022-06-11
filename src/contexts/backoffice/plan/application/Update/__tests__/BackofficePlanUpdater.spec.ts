import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { DataSource } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanCoin } from '../../../domain/BackofficePlanCoin';
import { BackofficePlanDuration } from '../../../domain/BackofficePlanDuration';
import { BackofficePlanId } from '../../../domain/BackofficePlanId';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanUpdater } from '../BackofficePlanUpdater';

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

describe('BackofficePlanUpdater', () => {
  let database: DataSource;
  let updater: BackofficePlanUpdater;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLitePlanRepository, BackofficePlanUpdater],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    updater = moduleRef.get<BackofficePlanUpdater>(BackofficePlanUpdater);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    let plan: PlanEntity;

    beforeEach(async () => {
      plan = new PlanEntity();
      const { id, price, duration, coin } = backofficePlanMock().toPrimitives();

      plan.id = id;
      plan.price = price;
      plan.duration = duration;
      plan.coin = coin;

      await database.manager.save(plan);
    });

    it('should update a plan', async () => {
      const price = BackofficePlanPriceFixture.random();
      await updater.run({
        planId: new BackofficePlanId(plan.id),
        planPrice: price,
        planDuration: new BackofficePlanDuration(plan.duration),
        planCoin: new BackofficePlanCoin(plan.coin),
      });

      const result = await database.manager.findOne(PlanEntity, {
        where: {
          id: plan.id,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.price).toBe(price.value);
    });
  });
});

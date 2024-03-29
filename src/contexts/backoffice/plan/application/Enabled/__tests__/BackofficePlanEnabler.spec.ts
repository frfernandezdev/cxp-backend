import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { DataSource } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanId } from '../../../domain/BackofficePlanId';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanEnabler } from '../BackofficePlanEnabler';

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

describe('BackofficePlanDisabler', () => {
  let database: DataSource;
  let enabler: BackofficePlanEnabler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLitePlanRepository, BackofficePlanEnabler],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    enabler = moduleRef.get<BackofficePlanEnabler>(BackofficePlanEnabler);
  });

  afterEach(async () => {
    await database.destroy();
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

    it('should enabled a plan', async () => {
      const id = plan.id;
      await enabler.run([new BackofficePlanId(id)]);

      const result = await database.manager.findOne(PlanEntity, {
        where: {
          id: plan.id,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeFalsy();
    });
  });
});

import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Connection } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanFinder } from '../BackofficePlanFinder';

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

describe('BackofficePlanFinder', () => {
  let database: Connection;
  let finder: BackofficePlanFinder;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLitePlanRepository, BackofficePlanFinder],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    finder = moduleRef.get<BackofficePlanFinder>(BackofficePlanFinder);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
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

    it('should finder all plans', async () => {
      const result = await finder.run();

      expect(result.plans).toHaveLength(plans.length);
    });
  });
});

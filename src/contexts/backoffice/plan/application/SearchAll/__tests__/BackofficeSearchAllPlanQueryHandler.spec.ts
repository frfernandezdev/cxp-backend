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
import { BackofficeSearchAllPlanQuery } from '../BackofficeSearchAllPlanQuery';
import { BackofficeSearchAllPlanQueryHandler } from '../BackofficeSearchAllPlanQueryHandler';

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

describe('BackofficeSearchAllPlanQueryHandler', () => {
  let database: Connection;
  let handler: BackofficeSearchAllPlanQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLitePlanRepository,
        BackofficePlanFinder,
        BackofficeSearchAllPlanQueryHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<BackofficeSearchAllPlanQueryHandler>(
      BackofficeSearchAllPlanQueryHandler,
    );
  });

  describe('#execute', () => {
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
      const result = await handler.execute(new BackofficeSearchAllPlanQuery());

      expect(result.plans).not.toHaveLength(0);
    });
  });
});

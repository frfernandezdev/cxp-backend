import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import { FilterOperator } from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Connection } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanByCriteriaSearcher } from '../BackofficePlanByCriteriaSearcher';

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

describe('BackofficePlanByCriteriaSearcher', () => {
  let database: Connection;
  let searcher: BackofficePlanByCriteriaSearcher;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLitePlanRepository,
        BackofficePlanByCriteriaSearcher,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    searcher = moduleRef.get<BackofficePlanByCriteriaSearcher>(
      BackofficePlanByCriteriaSearcher,
    );
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

    it('should searcher by criteria to plans', async () => {
      const filter = new Filter(
        new FilterField('id'),
        FilterOperator.fromValue('='),
        new FilterValue(plans[0].id),
      );
      const filters = new Filters([filter]);

      const result = await searcher.run(filters, null, 1, 0);

      expect(result.plans).toHaveLength(1);
    });
  });
});

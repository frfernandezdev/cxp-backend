import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { DataSource } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanDisabler } from '../BackofficePlanDisabler';
import { DisabledBackofficePlanCommand } from '../DisabledBackofficePlanCommand';
import { DisabledBackofficePlanCommandHandler } from '../DisabledBackofficePlanCommandHandler';

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

describe('DisabledBackofficePlanCommandHandler', () => {
  let database: DataSource;
  let handler: DisabledBackofficePlanCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLitePlanRepository,
        BackofficePlanDisabler,
        DisabledBackofficePlanCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    handler = moduleRef.get<DisabledBackofficePlanCommandHandler>(
      DisabledBackofficePlanCommandHandler,
    );
  });

  describe('#execute', () => {
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

    it('should disabler a plan', async () => {
      const id = plan.id;
      await handler.execute(new DisabledBackofficePlanCommand(id));

      const result = await database.manager.findOne(PlanEntity, {
        where: { id },
      });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeTruthy();
    });
  });
});

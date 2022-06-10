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
import { BackofficePlanUpdater } from '../BackofficePlanUpdater';
import { UpdateBackofficePlanCommand } from '../UpdateBackofficePlanCommand';
import { UpdateBackofficePlanCommandHandler } from '../UpdateBackofficePlanCommandHandler';

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

describe('UpdateBackofficePlanCommandHandler', () => {
  let database: Connection;
  let handler: UpdateBackofficePlanCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLitePlanRepository,
        BackofficePlanUpdater,
        UpdateBackofficePlanCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<UpdateBackofficePlanCommandHandler>(
      UpdateBackofficePlanCommandHandler,
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

    it('should update a plan', async () => {
      const price = BackofficePlanPriceFixture.random();
      const plainData = {
        id: plan.id,
        price: price.value,
        duration: plan.duration,
        coin: plan.coin,
      };

      await handler.execute(new UpdateBackofficePlanCommand(plainData));

      const result = await database.manager.findOne(PlanEntity, {
        id: plan.id,
      });

      expect(result).not.toBeUndefined();
      expect(result.price).toBe(price.value);
    });
  });
});

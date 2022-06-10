import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Connection } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanDeleter } from '../BackofficePlanDeleter';
import { DeleteBackofficePlanCommand } from '../DeleteBackofficePlanCommandHandler';
import { DeleteBackofficePlanCommandHandler } from '../DeleteBackofficePlanCommmand';

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

describe('DeleteBackofficePlanCommandHandler', () => {
  let database: Connection;
  let handler: DeleteBackofficePlanCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLitePlanRepository,
        BackofficePlanDeleter,
        DeleteBackofficePlanCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<DeleteBackofficePlanCommandHandler>(
      DeleteBackofficePlanCommandHandler,
    );
  });

  afterEach(async () => {
    await database.close();
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

    it('should deleter a plan', async () => {
      const id = plan.id;
      await handler.execute(new DeleteBackofficePlanCommand(id));

      const result = await database.manager.findOne(PlanEntity, { id });

      expect(result).toBeUndefined();
    });
  });
});

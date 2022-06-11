import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { DataSource } from 'typeorm';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanCreator } from '../BackofficePlanCreator';
import { CreateBackofficePlanCommand } from '../CreateBackofficePlanCommand';
import { CreateBackofficePlanCommandHandler } from '../CreateBackofficePlanCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('CreateBackofficePlanCommandHandler', () => {
  let database: DataSource;
  let handler: CreateBackofficePlanCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLitePlanRepository,
        BackofficePlanCreator,
        CreateBackofficePlanCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    handler = moduleRef.get<CreateBackofficePlanCommandHandler>(
      CreateBackofficePlanCommandHandler,
    );
  });

  it('should create a plan', async () => {
    const plainData = {
      id: BackofficePlanIdFixture.random().value,
      price: BackofficePlanPriceFixture.random().value,
      duration: BackofficePlanDurationFixture.random().value,
      coin: BackofficePlanCoinFixture.random().value,
    };

    await handler.execute(new CreateBackofficePlanCommand(plainData));

    const result = await database.manager.findOne(PlanEntity, {
      where: {
        id: plainData.id,
      },
    });

    expect(result).not.toBeUndefined();
    expect(result.id).toBe(plainData.id);
  });
});

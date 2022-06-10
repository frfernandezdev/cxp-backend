import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodCreator } from '../BackofficeMethodCreator';
import { CreateBackofficeMethodCommand } from '../CreateBackofficeMethodCommand';
import { CreateBackofficeMethodCommandHandler } from '../CreateBackofficeMethodCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('CreateBackofficeMethodCommandHandler', () => {
  let database: Connection;
  let handler: CreateBackofficeMethodCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodCreator,
        CreateBackofficeMethodCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<CreateBackofficeMethodCommandHandler>(
      CreateBackofficeMethodCommandHandler,
    );
  });

  it('should create a method', async () => {
    const plainData = {
      id: BackofficeMethodIdFixture.random().value,
      name: BackofficeMethodNameFixture.random().value,
    };

    await handler.execute(new CreateBackofficeMethodCommand(plainData));

    const result = await database.manager.findOne(MethodEntity, {
      id: plainData.id,
    });

    expect(result).not.toBeUndefined();
    expect(result.id).toBe(plainData.id);
  });
});

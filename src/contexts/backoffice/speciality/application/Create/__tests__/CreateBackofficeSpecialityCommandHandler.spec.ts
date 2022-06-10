import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityCreator } from '../BackofficeSpecialityCreator';
import { CreateBackofficeSpecialityCommand } from '../CreateBackofficeSpecialityCommand';
import { CreateBackofficeSpecialityCommandHandler } from '../CreateBackofficeSpecialityCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('CreateBackofficeSpecialityCommandHandler', () => {
  let database: Connection;
  let handler: CreateBackofficeSpecialityCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityCreator,
        CreateBackofficeSpecialityCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<CreateBackofficeSpecialityCommandHandler>(
      CreateBackofficeSpecialityCommandHandler,
    );
  });

  it('should create a method', async () => {
    const plainData = {
      id: BackofficeSpecialityIdFixture.random().value,
      name: BackofficeSpecialityNameFixture.random().value,
    };

    await handler.execute(new CreateBackofficeSpecialityCommand(plainData));

    const result = await database.manager.findOne(SpecialityEntity, {
      id: plainData.id,
    });

    expect(result).not.toBeUndefined();
    expect(result.id).toBe(plainData.id);
  });
});

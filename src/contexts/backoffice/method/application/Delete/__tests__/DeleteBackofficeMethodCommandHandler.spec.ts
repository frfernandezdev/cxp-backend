import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodDeleter } from '../BackofficeMethodDeleter';
import { DeleteBackofficeMethodCommand } from '../DeleteBackofficeMethodCommand';
import { DeleteBackofficeMethodCommandHandler } from '../DeleteBackofficeMethodCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('DeleteBackofficeMethodCommandHandler', () => {
  let database: Connection;
  let handler: DeleteBackofficeMethodCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodDeleter,
        DeleteBackofficeMethodCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<DeleteBackofficeMethodCommandHandler>(
      DeleteBackofficeMethodCommandHandler,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#execute', () => {
    let method: MethodEntity;

    beforeEach(async () => {
      method = new MethodEntity();
      const { id, name } = backofficeMethodMock().toPrimitives();

      method.id = id;
      method.name = name;

      await database.manager.save(method);
    });

    it('should deleter a admin', async () => {
      const id = method.id;
      await handler.execute(new DeleteBackofficeMethodCommand(id));

      const result = await database.manager.findOne(MethodEntity, { id });

      expect(result).toBeUndefined();
    });
  });
});

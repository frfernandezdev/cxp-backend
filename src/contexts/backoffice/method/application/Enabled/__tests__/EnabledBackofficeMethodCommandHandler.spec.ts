import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodEnabler } from '../BackofficeMethodEnabler';
import { EnabledBackofficeMethodCommand } from '../EnabledBackofficeMethodCommand';
import { EnabledBackofficeMethodCommandHandler } from '../EnabledBackofficeMethodCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('EnabledBackofficeAdminCommandHandler', () => {
  let database: Connection;
  let handler: EnabledBackofficeMethodCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodEnabler,
        EnabledBackofficeMethodCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<EnabledBackofficeMethodCommandHandler>(
      EnabledBackofficeMethodCommandHandler,
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

    it('should enabled a admin', async () => {
      const id = method.id;
      await handler.execute(new EnabledBackofficeMethodCommand(id));

      const result = await database.manager.findOne(MethodEntity, {
        id: method.id,
      });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeFalsy();
    });
  });
});

import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodDisabler } from '../BackofficeMethodDisabler';
import { DisabledBackofficeMethodCommand } from '../DisabledBackofficeMethodCommand';
import { DisabledBackofficeMethodCommandHandler } from '../DisabledBackofficeMethodCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('DisabledBackofficeMethodCommandHandler', () => {
  let database: Connection;
  let handler: DisabledBackofficeMethodCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodDisabler,
        DisabledBackofficeMethodCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<DisabledBackofficeMethodCommandHandler>(
      DisabledBackofficeMethodCommandHandler,
    );
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

    it('should disabler a admin', async () => {
      const id = method.id;
      await handler.execute(new DisabledBackofficeMethodCommand(id));

      const result = await database.manager.findOne(MethodEntity, { id });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeTruthy();
    });
  });
});

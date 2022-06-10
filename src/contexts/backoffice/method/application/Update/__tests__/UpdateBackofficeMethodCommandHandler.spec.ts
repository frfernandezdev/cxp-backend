import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodUpdater } from '../BackofficeMethodUpdater';
import { UpdateBackofficeMethodCommand } from '../UpdateBackofficeMethodCommand';
import { UpdateBackofficeMethodCommandHandler } from '../UpdateBackofficeMethodCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('UpdateBackofficeMethodCommandHandler', () => {
  let database: Connection;
  let handler: UpdateBackofficeMethodCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodUpdater,
        UpdateBackofficeMethodCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<UpdateBackofficeMethodCommandHandler>(
      UpdateBackofficeMethodCommandHandler,
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

    it('should update a method', async () => {
      const name = BackofficeMethodNameFixture.random();
      const plainData = {
        id: method.id,
        name: name.value,
      };

      await handler.execute(new UpdateBackofficeMethodCommand(plainData));

      const result = await database.manager.findOne(MethodEntity, {
        id: method.id,
      });

      expect(result).not.toBeUndefined();
      expect(result.name).toBe(name.value);
    });
  });
});

import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { DataSource } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodId } from '../../../domain/BackofficeMethodId';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodEnabler } from '../BackofficeMethodEnabler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('BackofficeMethodDisabler', () => {
  let database: DataSource;
  let enabler: BackofficeMethodEnabler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteMethodRepository, BackofficeMethodEnabler],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    enabler = moduleRef.get<BackofficeMethodEnabler>(BackofficeMethodEnabler);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    let method: MethodEntity;

    beforeEach(async () => {
      method = new MethodEntity();
      const { id, name } = backofficeMethodMock().toPrimitives();

      method.id = id;
      method.name = name;

      await database.manager.save(method);
    });

    it('should enabled a method', async () => {
      const id = method.id;
      await enabler.run([new BackofficeMethodId(id)]);

      const result = await database.manager.findOne(MethodEntity, {
        where: {
          id: method.id,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeFalsy();
    });
  });
});

import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { DataSource } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodId } from '../../../domain/BackofficeMethodId';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodDeleter } from '../BackofficeMethodDeleter';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('BackofficeMethodDeleter', () => {
  let database: DataSource;
  let deleter: BackofficeMethodDeleter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteMethodRepository, BackofficeMethodDeleter],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    deleter = moduleRef.get<BackofficeMethodDeleter>(BackofficeMethodDeleter);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    let admin: MethodEntity;

    beforeEach(async () => {
      admin = new MethodEntity();
      const { id, name } = backofficeMethodMock().toPrimitives();

      admin.id = id;
      admin.name = name;

      await database.manager.save(admin);
    });

    it('should delete a method', async () => {
      const id = admin.id;
      await deleter.run([new BackofficeMethodId(id)]);

      const result = await database.manager.findOne(MethodEntity, {
        where: {
          id: admin.id,
        },
      });

      expect(result).toBeUndefined();
    });
  });
});

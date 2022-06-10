import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodCreator } from '../BackofficeMethodCreator';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('BackofficeMethodCreator', () => {
  let database: Connection;
  let creator: BackofficeMethodCreator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteMethodRepository, BackofficeMethodCreator],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    creator = moduleRef.get<BackofficeMethodCreator>(BackofficeMethodCreator);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    it('should create a method', async () => {
      const mock = {
        methodId: BackofficeMethodIdFixture.random(),
        methodName: BackofficeMethodNameFixture.random(),
      };
      await creator.run(mock);

      const result = await database.manager.findOne(MethodEntity, {
        id: mock.methodId.value,
      });

      expect(result).not.toBeUndefined();
      expect(result.id).toBe(mock.methodId.value);
    });
  });
});

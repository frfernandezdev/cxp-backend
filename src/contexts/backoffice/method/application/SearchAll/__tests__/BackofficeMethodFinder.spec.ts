import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodFinder } from '../BackofficeMethodFinder';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('BackofficeMethodFinder', () => {
  let database: Connection;
  let finder: BackofficeMethodFinder;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteMethodRepository, BackofficeMethodFinder],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    finder = moduleRef.get<BackofficeMethodFinder>(BackofficeMethodFinder);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    const methods: MethodEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (methods[i] = new MethodEntity());
        const { id, name } = backofficeMethodMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(MethodEntity, item);
      }
    });

    it('should finder all methods', async () => {
      const result = await finder.run();

      expect(result.methods).toHaveLength(methods.length);
    });
  });
});

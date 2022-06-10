import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodByCriteriaSearcher } from '../BackofficeMethodByCriteriaSearcher';
import { BackofficeSearchMethodByCriteriaQuery } from '../BackofficeSearchMethodByCriteriaQuery';
import { BackofficeSearchMethodByCriteriaQueryHandler } from '../BackofficeSearchMethodByCriteriaQueryHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('BackofficeSearchAllMethodQueryHandler', () => {
  let database: Connection;
  let handler: BackofficeSearchMethodByCriteriaQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodByCriteriaSearcher,
        BackofficeSearchMethodByCriteriaQueryHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<BackofficeSearchMethodByCriteriaQueryHandler>(
      BackofficeSearchMethodByCriteriaQueryHandler,
    );
  });

  describe('#execute', () => {
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

    it('should search by criteria admins', async () => {
      const filter = new Map();
      filter.set('field', 'name');
      filter.set('operator', '=');
      filter.set('value', methods[0].name);

      const orderBy = 'id';
      const orderType = 'asc';
      const limit = 10;
      const offset = 0;
      const query = new BackofficeSearchMethodByCriteriaQuery(
        [filter],
        orderBy,
        orderType,
        limit,
        offset,
      );
      const result = await handler.execute(query);

      expect(result.methods).not.toBeUndefined();
      result.methods.map((item) => {
        const raw = item.toPrimitives();

        expect(methods).toContain({
          id: raw.id,
          name: raw.name,
        });
      });
    });
  });
});

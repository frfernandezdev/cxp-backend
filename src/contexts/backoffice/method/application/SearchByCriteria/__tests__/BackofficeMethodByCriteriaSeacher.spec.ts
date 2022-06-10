import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import { FilterOperator } from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodByCriteriaSearcher } from '../BackofficeMethodByCriteriaSearcher';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('BackofficeMethodssByCriteriaSearcher', () => {
  let database: Connection;
  let searcher: BackofficeMethodByCriteriaSearcher;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteMethodRepository,
        BackofficeMethodByCriteriaSearcher,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    searcher = moduleRef.get<BackofficeMethodByCriteriaSearcher>(
      BackofficeMethodByCriteriaSearcher,
    );
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

    it('should searcher by criteria to admins', async () => {
      const filter = new Filter(
        new FilterField('id'),
        FilterOperator.fromValue('='),
        new FilterValue(methods[0].id),
      );
      const filters = new Filters([filter]);

      const result = await searcher.run(filters, null, 1, 0);

      expect(result.methods).toHaveLength(1);
    });
  });
});

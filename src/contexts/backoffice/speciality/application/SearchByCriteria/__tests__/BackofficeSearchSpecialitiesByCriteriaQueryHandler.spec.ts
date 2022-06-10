import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import { FilterOperator } from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialitiesByCriteriaSearcher } from '../BackofficeSpecialitiesByCriteriaSearcher';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeSpecialitiesByCriteriaSearcher', () => {
  let database: Connection;
  let searcher: BackofficeSpecialitiesByCriteriaSearcher;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialitiesByCriteriaSearcher,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    searcher = moduleRef.get<BackofficeSpecialitiesByCriteriaSearcher>(
      BackofficeSpecialitiesByCriteriaSearcher,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    const specialities: SpecialityEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (specialities[i] = new SpecialityEntity());
        const { id, name } = backofficeSpecialityMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(SpecialityEntity, item);
      }
    });

    it('should searcher by criteria to specialities', async () => {
      const filter = new Filter(
        new FilterField('id'),
        FilterOperator.fromValue('='),
        new FilterValue(specialities[0].id),
      );
      const filters = new Filters([filter]);

      const result = await searcher.run(filters, null, 1, 0);

      expect(result.specialities).toHaveLength(1);
    });
  });
});

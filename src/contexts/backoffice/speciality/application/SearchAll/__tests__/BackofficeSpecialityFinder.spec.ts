import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityFinder } from '../BackofficeSpecialityFinder';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeSpecialityFinder', () => {
  let database: Connection;
  let finder: BackofficeSpecialityFinder;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityFinder,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    finder = moduleRef.get<BackofficeSpecialityFinder>(
      BackofficeSpecialityFinder,
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

    it('should finder all specialities', async () => {
      const result = await finder.run();

      expect(result.specialities).toHaveLength(specialities.length);
    });
  });
});

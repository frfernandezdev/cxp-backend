import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { DataSource } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSearchAllSpecialityQuery } from '../BackofficeSearchAllSpecialityQuery';
import { BackofficeSearchAllSpecialityQueryHandler } from '../BackofficeSearchAllSpecialityQueryHandler';
import { BackofficeSpecialityFinder } from '../BackofficeSpecialityFinder';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeSearchAllMethodQueryHandler', () => {
  let database: DataSource;
  let handler: BackofficeSearchAllSpecialityQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityFinder,
        BackofficeSearchAllSpecialityQueryHandler,
      ],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    handler = moduleRef.get<BackofficeSearchAllSpecialityQueryHandler>(
      BackofficeSearchAllSpecialityQueryHandler,
    );
  });

  describe('#execute', () => {
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
      const result = await handler.execute(
        new BackofficeSearchAllSpecialityQuery(),
      );

      expect(result.specialities).not.toHaveLength(0);
    });
  });
});

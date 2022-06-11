import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { DataSource } from 'typeorm';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityCreator } from '../BackofficeSpecialityCreator';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('BackofficeSpecialityCreator', () => {
  let database: DataSource;
  let creator: BackofficeSpecialityCreator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityCreator,
      ],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    creator = moduleRef.get<BackofficeSpecialityCreator>(
      BackofficeSpecialityCreator,
    );
  });

  afterEach(async () => {
    await database.destroy();
  });

  describe('#run', () => {
    it('should create a speciality', async () => {
      const mock = {
        specialityId: BackofficeSpecialityIdFixture.random(),
        specialityName: BackofficeSpecialityNameFixture.random(),
      };
      await creator.run(mock);

      const result = await database.manager.findOne(SpecialityEntity, {
        where: {
          id: mock.specialityId.value,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.id).toBe(mock.specialityId.value);
    });
  });
});

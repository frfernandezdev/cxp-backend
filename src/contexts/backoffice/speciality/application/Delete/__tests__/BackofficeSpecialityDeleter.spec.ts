import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { DataSource } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityDeleter } from '../BackofficeSpecialityDeleter';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeSpecialityDeleter', () => {
  let database: DataSource;
  let deleter: BackofficeSpecialityDeleter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityDeleter,
      ],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    deleter = moduleRef.get<BackofficeSpecialityDeleter>(
      BackofficeSpecialityDeleter,
    );
  });

  afterEach(async () => {
    await database.destroy();
  });

  describe('#run', () => {
    let speciality: SpecialityEntity;

    beforeEach(async () => {
      speciality = new SpecialityEntity();
      const { id, name } = backofficeSpecialityMock().toPrimitives();

      speciality.id = id;
      speciality.name = name;

      await database.manager.save(speciality);
    });

    it('should delete a speciality', async () => {
      const id = speciality.id;
      await deleter.run([new BackofficeSpecialityId(id)]);

      const result = await database.manager.findOne(SpecialityEntity, {
        where: {
          id: speciality.id,
        },
      });

      expect(result).toBeUndefined();
    });
  });
});

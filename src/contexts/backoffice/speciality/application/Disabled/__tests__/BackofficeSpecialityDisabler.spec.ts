import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { DataSource } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityDisabler } from '../BackofficeSpecialityDisabler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const BackofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeMethodDisabler', () => {
  let database: DataSource;
  let disabler: BackofficeSpecialityDisabler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityDisabler,
      ],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    disabler = moduleRef.get<BackofficeSpecialityDisabler>(
      BackofficeSpecialityDisabler,
    );
  });

  afterEach(async () => {
    await database.destroy();
  });

  describe('#run', () => {
    let speciality: SpecialityEntity;

    beforeEach(async () => {
      speciality = new SpecialityEntity();
      const { id, name } = BackofficeSpecialityMock().toPrimitives();

      speciality.id = id;
      speciality.name = name;

      await database.manager.save(speciality);
    });

    it('should disabled a speciality', async () => {
      const id = speciality.id;
      await disabler.run([new BackofficeSpecialityId(id)]);

      const result = await database.manager.findOne(SpecialityEntity, {
        where: {
          id: speciality.id,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeTruthy();
    });
  });
});

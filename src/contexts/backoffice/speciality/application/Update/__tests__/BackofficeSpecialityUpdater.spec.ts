import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityUpdater } from '../BackofficeSpecialityUpdater';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeSpecialityUpdater', () => {
  let database: Connection;
  let updater: BackofficeSpecialityUpdater;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityUpdater,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    updater = moduleRef.get<BackofficeSpecialityUpdater>(
      BackofficeSpecialityUpdater,
    );
  });

  afterEach(async () => {
    await database.close();
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

    it('should update a speciality', async () => {
      const name = BackofficeSpecialityNameFixture.random();
      await updater.run({
        specialityId: new BackofficeSpecialityId(speciality.id),
        specialityName: name,
      });

      const result = await database.manager.findOne(SpecialityEntity, {
        id: speciality.id,
      });

      expect(result).not.toBeUndefined();
      expect(result.name).toBe(name.value);
    });
  });
});

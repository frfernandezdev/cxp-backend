import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityCreator } from '../BackofficeSpecialityCreator';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('BackofficeSpecialityCreator', () => {
  let database: Connection;
  let creator: BackofficeSpecialityCreator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityCreator,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    creator = moduleRef.get<BackofficeSpecialityCreator>(
      BackofficeSpecialityCreator,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    it('should create a speciality', async () => {
      const mock = {
        specialityId: BackofficeSpecialityIdFixture.random(),
        specialityName: BackofficeSpecialityNameFixture.random(),
      };
      await creator.run(mock);

      const result = await database.manager.findOne(SpecialityEntity, {
        id: mock.specialityId.value,
      });

      expect(result).not.toBeUndefined();
      expect(result.id).toBe(mock.specialityId.value);
    });
  });
});

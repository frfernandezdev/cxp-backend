import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityUpdater } from '../BackofficeSpecialityUpdater';
import { UpdateBackofficeSpecialityCommand } from '../UpdateBackofficeSpecialityCommand';
import { UpdateBackofficeSpecialityCommandHandler } from '../UpdateBackofficeSpecialityCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('UpdateBackofficeSpecialityCommandHandler', () => {
  let database: Connection;
  let handler: UpdateBackofficeSpecialityCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteSpecialityRepository,
        BackofficeSpecialityUpdater,
        UpdateBackofficeSpecialityCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<UpdateBackofficeSpecialityCommandHandler>(
      UpdateBackofficeSpecialityCommandHandler,
    );
  });

  describe('#execute', () => {
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
      const plainData = {
        id: speciality.id,
        name: name.value,
      };

      await handler.execute(new UpdateBackofficeSpecialityCommand(plainData));

      const result = await database.manager.findOne(SpecialityEntity, {
        id: speciality.id,
      });

      expect(result).not.toBeUndefined();
      expect(result.name).toBe(name.value);
    });
  });
});

import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Connection } from 'typeorm';
import { BackofficeAdmin } from '../../../domain/BackofficeAdmin';
import { BackofficeAdminDisplayName } from '../../../domain/BackofficeAdminDisplayName';
import { BackofficeAdminEmail } from '../../../domain/BackofficeAdminEmail';
import { BackofficeAdminId } from '../../../domain/BackofficeAdminId';
import { BackofficeAdminLastname } from '../../../domain/BackofficeAdminLastname';
import { BackofficeAdminPhoneNumber } from '../../../domain/BackofficeAdminPhoneNumber';
import { BackofficeAdminPhotoURL } from '../../../domain/BackofficeAdminPhotoURL';
import { BackofficeAdminRole } from '../../../domain/BackofficeAdminRole';
import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { BackofficeSQLiteAdminRepository } from '../../../infrastructure/persistence/BackofficeSQLiteAdminRepository';
import { BackofficeAdminUpdater } from '../BackofficeAdminUpdater';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeAdminMock = () =>
  new BackofficeAdmin(
    BackofficeAdminIdFixture.random(),
    BackofficeAdminEmailFixture.random(),
    BackofficeAdminDisplayNameFixture.random(),
    BackofficeAdminPhoneNumberFixture.random(),
    BackofficeAdminPhotoURLFixture.random(),
    BackofficeAdminNameFixture.random(),
    BackofficeAdminLastnameFixture.random(),
    BackofficeAdminRoleFixture.random(),
  );

describe('BackofficeAdminUpdater', () => {
  let database: Connection;
  let updater: BackofficeAdminUpdater;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteAdminRepository, BackofficeAdminUpdater],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    updater = moduleRef.get<BackofficeAdminUpdater>(BackofficeAdminUpdater);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    let admin: AdminEntity;

    beforeEach(async () => {
      admin = new AdminEntity();
      const {
        id,
        email,
        displayName,
        phoneNumber,
        photoURL,
        name,
        lastname,
        role,
      } = backofficeAdminMock().toPrimitives();

      admin.id = id;
      admin.email = email;
      admin.displayName = displayName;
      admin.phoneNumber = phoneNumber;
      admin.photoURL = photoURL;
      admin.name = name;
      admin.lastname = lastname;
      admin.role = role;

      await database.manager.save(admin);
    });

    it('should update a admin', async () => {
      const name = BackofficeAdminNameFixture.random();
      await updater.run({
        adminId: new BackofficeAdminId(admin.id),
        adminEmail: new BackofficeAdminEmail(admin.email),
        adminDisplayName: new BackofficeAdminDisplayName(admin.displayName),
        adminPhoneNumber: new BackofficeAdminPhoneNumber(admin.phoneNumber),
        adminPhotoURL: new BackofficeAdminPhotoURL(admin.photoURL),
        adminName: name,
        adminLastname: new BackofficeAdminLastname(admin.lastname),
        adminRole: new BackofficeAdminRole(admin.role),
      });

      const result = await database.manager.findOne(AdminEntity, {
        id: admin.id,
      });

      expect(result).not.toBeUndefined();
      expect(result.name).toBe(name.value);
    });
  });
});

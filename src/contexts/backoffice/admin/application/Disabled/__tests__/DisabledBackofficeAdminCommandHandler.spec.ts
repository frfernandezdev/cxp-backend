import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Connection } from 'typeorm';
import { BackofficeAdmin } from '../../../domain/BackofficeAdmin';
import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { BackofficeSQLiteAdminRepository } from '../../../infrastructure/persistence/BackofficeSQLiteAdminRepository';
import { BackofficeAdminDisabler } from '../BackofficeAdminDisabler';
import { DisabledBackofficeAdminCommand } from '../DisabledBackofficeAdminCommand';
import { DisabledBackofficeAdminCommandHandler } from '../DisabledBackofficeAdminCommandHandler';

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

describe('DisabledBackofficeAdminCommandHandler', () => {
  let database: Connection;
  let handler: DisabledBackofficeAdminCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteAdminRepository,
        BackofficeAdminDisabler,
        DisabledBackofficeAdminCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<DisabledBackofficeAdminCommandHandler>(
      DisabledBackofficeAdminCommandHandler,
    );
  });

  describe('#execute', () => {
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

    it('should disabler a admin', async () => {
      const id = admin.id;
      await handler.execute(new DisabledBackofficeAdminCommand(id));

      const result = await database.manager.findOne(AdminEntity, { id });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeTruthy();
    });
  });
});

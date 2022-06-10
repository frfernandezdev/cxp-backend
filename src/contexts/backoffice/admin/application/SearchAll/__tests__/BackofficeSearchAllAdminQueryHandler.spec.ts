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
import { BackofficeAdminFinder } from '../BackofficeAdminFinder';
import { BackofficeSearchAllAdminQuery } from '../BackofficeSearchAllAdminQuery';
import { BackofficeSearchAllAdminQueryHandler } from '../BackofficeSearchAllAdminQueryHandler';

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

describe('BackofficeSearchAllAdminQueryHandler', () => {
  let database: Connection;
  let handler: BackofficeSearchAllAdminQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteAdminRepository,
        BackofficeAdminFinder,
        BackofficeSearchAllAdminQueryHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<BackofficeSearchAllAdminQueryHandler>(
      BackofficeSearchAllAdminQueryHandler,
    );
  });

  describe('#execute', () => {
    const admins: AdminEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (admins[i] = new AdminEntity());
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

        item.id = id;
        item.email = email;
        item.displayName = displayName;
        item.phoneNumber = phoneNumber;
        item.photoURL = photoURL;
        item.name = name;
        item.lastname = lastname;
        item.role = role;

        await database.manager.save(AdminEntity, item);
      }
    });

    it('should finder all admins', async () => {
      const result = await handler.execute(new BackofficeSearchAllAdminQuery());

      expect(result.admins).not.toHaveLength(0);
    });
  });
});

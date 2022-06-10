import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { Connection } from 'typeorm';
import { BackofficeUser } from '../../../domain/BackofficeUser';
import { BackofficeUserCompleteRegisterFixture } from '../../../domain/__fixtures__/BackofficeUserCompleteRegisterFixture';
import { BackofficeUserDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeUserDisplayNameFixture';
import { BackofficeUserEmailFixture } from '../../../domain/__fixtures__/BackofficeUserEmailFixture';
import { BackofficeUserIdFixture } from '../../../domain/__fixtures__/BackofficeUserIdFixture';
import { BackofficeUserLastnameFixture } from '../../../domain/__fixtures__/BackofficeUserLastnameFixture';
import { BackofficeUserLocationFixture } from '../../../domain/__fixtures__/BackofficeUserLocationFixture';
import { BackofficeUserNameFixture } from '../../../domain/__fixtures__/BackofficeUserNameFixture';
import { BackofficeUserPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeUserPhoneNumberFixture';
import { BackofficeUserPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeUserPhotoURLFixture';
import { BackofficeUserSessionTakenFixture } from '../../../domain/__fixtures__/BackofficeUserSessionTakenFixture';
import { BackofficeUserTimezoneFixture } from '../../../domain/__fixtures__/BackofficeUserTimezoneFixture';
import { BackofficeSQLiteUserRepository } from '../../../infrastructure/persistence/BackofficeSQLiteUserRepository';
import { BackofficeSearchAllUserQuery } from '../BackofficeSearchAllUserQuery';
import { BackofficeSearchAllUserQueryHandler } from '../BackofficeSearchAllUserQueryHandler';
import { BackofficeUserFinder } from '../BackofficeUserFinder';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeUserMock = () =>
  new BackofficeUser(
    BackofficeUserIdFixture.random(),
    BackofficeUserEmailFixture.random(),
    BackofficeUserDisplayNameFixture.random(),
    BackofficeUserPhoneNumberFixture.random(),
    BackofficeUserPhotoURLFixture.random(),
    BackofficeUserNameFixture.random(),
    BackofficeUserLastnameFixture.random(),
    BackofficeUserCompleteRegisterFixture.random(),
    BackofficeUserLocationFixture.random(),
    BackofficeUserSessionTakenFixture.random(),
    BackofficeUserTimezoneFixture.random(),
  );

describe('BackofficeSearchAllUserQueryHandler', () => {
  let database: Connection;
  let handler: BackofficeSearchAllUserQueryHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteUserRepository,
        BackofficeUserFinder,
        BackofficeSearchAllUserQueryHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<BackofficeSearchAllUserQueryHandler>(
      BackofficeSearchAllUserQueryHandler,
    );
  });

  describe('#execute', () => {
    const users: UserEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (users[i] = new UserEntity());
        const {
          id,
          email,
          displayName,
          phoneNumber,
          photoURL,
          name,
          lastname,
          completeRegister,
          location,
          timezone,
          sessionTaken,
        } = backofficeUserMock().toPrimitives();

        item.id = id;
        item.email = email;
        item.displayName = displayName;
        item.phoneNumber = phoneNumber;
        item.photoURL = photoURL;
        item.name = name;
        item.lastname = lastname;
        item.completeRegister = completeRegister;
        item.location = location;
        item.timezone = timezone;
        item.sessionTaken = sessionTaken;

        await database.manager.save(UserEntity, item);
      }
    });

    it('should finder all specialities', async () => {
      const result = await handler.execute(new BackofficeSearchAllUserQuery());

      expect(result.users).not.toHaveLength(0);
    });
  });
});

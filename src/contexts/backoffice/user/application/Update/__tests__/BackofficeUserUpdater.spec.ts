import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { DataSource } from 'typeorm';
import { BackofficeUser } from '../../../domain/BackofficeUser';
import { BackofficeUserCompleteRegister } from '../../../domain/BackofficeUserCompleteRegister';
import { BackofficeUserDisplayName } from '../../../domain/BackofficeUserDisplayName';
import { BackofficeUserEmail } from '../../../domain/BackofficeUserEmail';
import { BackofficeUserId } from '../../../domain/BackofficeUserId';
import { BackofficeUserLastname } from '../../../domain/BackofficeUserLastname';
import { BackofficeUserLocation } from '../../../domain/BackofficeUserLocation';
import { BackofficeUserName } from '../../../domain/BackofficeUserName';
import { BackofficeUserPhoneNumber } from '../../../domain/BackofficeUserPhoneNumber';
import { BackofficeUserPhotoURL } from '../../../domain/BackofficeUserPhotoURL';
import { BackofficeUserSessionTaken } from '../../../domain/BackofficeUserSessionTaken';
import { BackofficeUserTimezone } from '../../../domain/BackofficeUserTimezone';
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
import { BackofficeUserUpdater } from '../BackofficeUserUpdater';

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

describe('BackofficeUserUpdater', () => {
  let database: DataSource;
  let updater: BackofficeUserUpdater;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteUserRepository, BackofficeUserUpdater],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    updater = moduleRef.get<BackofficeUserUpdater>(BackofficeUserUpdater);
  });

  afterEach(async () => {
    await database.destroy();
  });

  describe('#run', () => {
    let user: UserEntity;

    beforeEach(async () => {
      user = new UserEntity();
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

      user.id = id;
      user.email = email;
      user.displayName = displayName;
      user.phoneNumber = phoneNumber;
      user.photoURL = photoURL;
      user.name = name;
      user.lastname = lastname;
      user.completeRegister = completeRegister;
      user.location = location;
      user.timezone = timezone;
      user.sessionTaken = sessionTaken;

      await database.manager.save(user);
    });

    it('should update a user', async () => {
      const name = BackofficeUserNameFixture.random();
      await updater.run({
        userId: new BackofficeUserId(user.id),
        userEmail: new BackofficeUserEmail(user.email),
        userDisplayName: new BackofficeUserDisplayName(user.displayName),
        userPhoneNumber: new BackofficeUserPhoneNumber(user.phoneNumber),
        userPhotoURL: new BackofficeUserPhotoURL(user.photoURL),
        userName: new BackofficeUserName(user.name),
        userLastname: new BackofficeUserLastname(user.lastname),
        userCompleteRegister: new BackofficeUserCompleteRegister(
          user.completeRegister,
        ),
        userLocation: new BackofficeUserLocation(user.location),
        userTimezone: new BackofficeUserTimezone(user.timezone),
        userSessionTaken: new BackofficeUserSessionTaken(user.sessionTaken),
      });

      const result = await database.manager.findOne(UserEntity, {
        where: {
          id: user.id,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.name).toBe(name.value);
    });
  });
});

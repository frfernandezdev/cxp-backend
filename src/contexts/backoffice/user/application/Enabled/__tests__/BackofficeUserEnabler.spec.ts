import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { DataSource } from 'typeorm';
import { BackofficeUser } from '../../../domain/BackofficeUser';
import { BackofficeUserId } from '../../../domain/BackofficeUserId';
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
import { BackofficeUserEnabler } from '../BackofficeUserEnabler';

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
    BackofficeUserTimezoneFixture.random(),
    BackofficeUserSessionTakenFixture.random(),
    BackofficeUserLocationFixture.random(),
  );

describe('BackofficeUserDisabler', () => {
  let database: DataSource;
  let enabler: BackofficeUserEnabler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteUserRepository, BackofficeUserEnabler],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    enabler = moduleRef.get<BackofficeUserEnabler>(BackofficeUserEnabler);
  });

  afterEach(async () => {
    await database.close();
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

    it('should enabled a user', async () => {
      const id = user.id;
      await enabler.run([new BackofficeUserId(id)]);

      const result = await database.manager.findOne(UserEntity, {
        where: {
          id: user.id,
        },
      });

      expect(result).not.toBeUndefined();
      expect(result.disabled).toBeFalsy();
    });
  });
});

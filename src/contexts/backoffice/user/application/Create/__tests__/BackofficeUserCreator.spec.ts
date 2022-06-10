import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { Connection } from 'typeorm';
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
import { BackofficeUserCreator } from '../BackofficeUserCreator';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('BackofficeUserCreator', () => {
  let database: Connection;
  let creator: BackofficeUserCreator;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteUserRepository, BackofficeUserCreator],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    creator = moduleRef.get<BackofficeUserCreator>(BackofficeUserCreator);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#run', () => {
    it('should create a user', async () => {
      const mock = {
        userId: BackofficeUserIdFixture.random(),
        userEmail: BackofficeUserEmailFixture.random(),
        userDisplayName: BackofficeUserDisplayNameFixture.random(),
        userPhoneNumber: BackofficeUserPhoneNumberFixture.random(),
        userPhotoURL: BackofficeUserPhotoURLFixture.random(),
        userName: BackofficeUserNameFixture.random(),
        userLastname: BackofficeUserLastnameFixture.random(),
        userCompleteRegister: BackofficeUserCompleteRegisterFixture.random(),
        userLocation: BackofficeUserLocationFixture.random(),
        userTimezone: BackofficeUserTimezoneFixture.random(),
        userSessionTaken: BackofficeUserSessionTakenFixture.random(),
      };
      await creator.run(mock);

      const result = await database.manager.findOne(UserEntity, {
        id: mock.userId.value,
      });

      expect(result).not.toBeUndefined();
      expect(result.id).toBe(mock.userId.value);
    });
  });
});

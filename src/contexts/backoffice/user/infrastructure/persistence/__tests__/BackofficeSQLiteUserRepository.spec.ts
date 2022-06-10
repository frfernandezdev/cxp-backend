import { Test } from '@nestjs/testing';
import { time } from 'console';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import {
  FilterOperator,
  Operator,
} from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { Connection } from 'typeorm';
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
import { BackofficeSQLiteUserRepository } from '../BackofficeSQLiteUserRepository';

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

describe('BackofficeSQLiteUserRepository', () => {
  let database: Connection;
  let repository: BackofficeSQLiteUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteUserRepository],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    repository = moduleRef.get<BackofficeSQLiteUserRepository>(
      BackofficeSQLiteUserRepository,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#save', () => {
    it('should create a new user', async () => {
      const admin = backofficeUserMock();
      const raw = admin.toPrimitives();

      await repository.save(admin);

      const entity = await database.manager.findOne(UserEntity, {
        id: raw.id,
      });

      expect(entity).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: entity.id,
        email: entity.email,
        displayName: entity.displayName,
        phoneNumber: entity.phoneNumber,
        photoURL: entity.photoURL,
        name: entity.name,
        lastname: entity.lastname,
        completeRegister: entity.completeRegister,
        location: entity.location,
        timezone: entity.timezone,
        sessionTaken: entity.sessionTaken,
      });
    });
  });

  describe('#findById', () => {
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

      await database.manager.save(UserEntity, user);
    });

    it('should find a user by id', async () => {
      const result = await repository.findById(new BackofficeUserId(user.id));
      const raw = result.toPrimitives();

      expect(user).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        name: user.name,
        lastname: user.lastname,
        completeRegister: user.completeRegister,
        location: user.location,
        timezone: user.timezone,
        sessionTaken: user.sessionTaken,
      });
    });
  });

  describe('#findOne', () => {
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

      await database.manager.save(UserEntity, user);
    });

    it('should find a user by criteria', async () => {
      const filter = new Filter(
        new FilterField('email'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(user.email),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);
      const result = await repository.findOne(criteria);
      const raw = result.toPrimitives();

      expect(result).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        name: user.name,
        lastname: user.lastname,
        completeRegister: user.completeRegister,
        location: user.location,
        timezone: user.timezone,
        sessionTaken: user.sessionTaken,
      });
    });
  });

  describe('#findAll', () => {
    const admins: UserEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (admins[i] = new UserEntity());
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

    it('should find all user', async () => {
      const result = await repository.findAll();

      expect(result).toHaveLength(admins.length);
    });
  });

  describe('#delete', () => {
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

      await database.manager.save(UserEntity, user);
    });

    it('should delete a user', async () => {
      await repository.delete(user.id);

      const result = await database.manager.findOne(UserEntity, {
        id: user.id,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('#remove', () => {
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

    it('should remove users', async () => {
      const ids = users.map((item) => item.id);
      await repository.remove(ids);

      const results = await database.manager.findByIds(
        UserEntity,
        users.map((item) => item.id),
      );

      expect(results).toHaveLength(0);
      results.map((item) => expect(users).not.toContain(item));
    });
  });

  describe('#disabled', () => {
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

    it('should disabled user', async () => {
      const ids = users.map((item) => item.id);

      await repository.disabled(ids);

      const result = await database.manager.findByIds(
        UserEntity,
        users.map((item) => item.id),
      );

      expect(result).toHaveLength(users.length);
      result.map((item) => expect(item.disabled).toBeTruthy());
    });
  });
});

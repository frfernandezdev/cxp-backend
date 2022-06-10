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
import { CreateBackofficeUserCommand } from '../CreateBackofficeUserCommand';
import { CreateBackofficeUserCommandHandler } from '../CreateBackofficeUserCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('CreateBackofficeUserCommandHandler', () => {
  let database: Connection;
  let handler: CreateBackofficeUserCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteUserRepository,
        BackofficeUserCreator,
        CreateBackofficeUserCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<CreateBackofficeUserCommandHandler>(
      CreateBackofficeUserCommandHandler,
    );
  });

  it('should create a user', async () => {
    const plainData = {
      id: BackofficeUserIdFixture.random().value,
      email: BackofficeUserEmailFixture.random().value,
      displayName: BackofficeUserDisplayNameFixture.random().value,
      phoneNumber: BackofficeUserPhoneNumberFixture.random().value,
      photoURL: BackofficeUserPhotoURLFixture.random().value,
      name: BackofficeUserNameFixture.random().value,
      lastname: BackofficeUserLastnameFixture.random().value,
      completeRegister: BackofficeUserCompleteRegisterFixture.random().value,
      location: BackofficeUserLocationFixture.random().value,
      timezone: BackofficeUserTimezoneFixture.random().value,
      sessionTaken: BackofficeUserSessionTakenFixture.random().value,
    };

    await handler.execute(new CreateBackofficeUserCommand(plainData));

    const result = await database.manager.findOne(UserEntity, {
      id: plainData.id,
    });

    expect(result).not.toBeUndefined();
    expect(result.id).toBe(plainData.id);
  });
});

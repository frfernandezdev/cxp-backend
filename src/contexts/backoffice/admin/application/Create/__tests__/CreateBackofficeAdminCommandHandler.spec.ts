import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Connection } from 'typeorm';
import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { BackofficeSQLiteAdminRepository } from '../../../infrastructure/persistence/BackofficeSQLiteAdminRepository';
import { BackofficeAdminCreator } from '../BackofficeAdminCreator';
import { CreateBackofficeAdminCommand } from '../CreateBackofficeAdminCommand';
import { CreateBackofficeAdminCommandHandler } from '../CreateBackofficeAdminCommandHandler';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

describe('CreateBackofficeAdminCommandHandler', () => {
  let database: Connection;
  let handler: CreateBackofficeAdminCommandHandler;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteAdminRepository,
        BackofficeAdminCreator,
        CreateBackofficeAdminCommandHandler,
      ],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    handler = moduleRef.get<CreateBackofficeAdminCommandHandler>(
      CreateBackofficeAdminCommandHandler,
    );
  });

  it('should create a admin', async () => {
    const plainData = {
      id: BackofficeAdminIdFixture.random().value,
      email: BackofficeAdminEmailFixture.random().value,
      displayName: BackofficeAdminDisplayNameFixture.random().value,
      phoneNumber: BackofficeAdminPhoneNumberFixture.random().value,
      photoURL: BackofficeAdminPhotoURLFixture.random().value,
      name: BackofficeAdminNameFixture.random().value,
      lastname: BackofficeAdminLastnameFixture.random().value,
      role: BackofficeAdminRoleFixture.random().value,
    };

    await handler.execute(new CreateBackofficeAdminCommand(plainData));

    const result = await database.manager.findOne(AdminEntity, {
      id: plainData.id,
    });

    expect(result).not.toBeUndefined();
    expect(result.id).toBe(plainData.id);
  });
});

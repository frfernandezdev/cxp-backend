import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { CreateBackofficeAdminCommand } from '../CreateBackofficeAdminCommand';

describe('CreateBackofficeAdminCommand', () => {
  it('should create command', async () => {
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
    const command = new CreateBackofficeAdminCommand(plainData);

    expect(command).toBeInstanceOf(CreateBackofficeAdminCommand);
    expect(command).toMatchObject(plainData);
  });
});

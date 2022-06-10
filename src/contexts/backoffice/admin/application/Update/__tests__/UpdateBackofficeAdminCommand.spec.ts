import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { UpdateBackofficeAdminCommand } from '../UpdateBackofficeAdminCommand';

describe('UpdateBackofficeAdminCommand', () => {
  it('should update a admin', () => {
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
    const command = new UpdateBackofficeAdminCommand(plainData);

    expect(command).toBeInstanceOf(UpdateBackofficeAdminCommand);
    expect(command).toMatchObject(plainData);
  });
});

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
import { CreateBackofficeUserCommand } from '../CreateBackofficeUserCommand';

describe('CreateBackofficeUserCommand', () => {
  it('should create command', async () => {
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
    const command = new CreateBackofficeUserCommand(plainData);

    expect(command).toBeInstanceOf(CreateBackofficeUserCommand);
    expect(command).toMatchObject(plainData);
  });
});

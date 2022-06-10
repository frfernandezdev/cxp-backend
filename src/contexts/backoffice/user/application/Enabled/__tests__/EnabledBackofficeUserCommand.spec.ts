import { BackofficeUserIdFixture } from '../../../domain/__fixtures__/BackofficeUserIdFixture';
import { EnabledBackofficeUserCommand } from '../EnabledBackofficeUserCommand';

describe('EnabledBackofficeUserCommand', () => {
  it('should enabler command', () => {
    const id = BackofficeUserIdFixture.random().value;
    const command = new EnabledBackofficeUserCommand(id);

    expect(command).toBeInstanceOf(EnabledBackofficeUserCommand);
    expect(command).toMatchObject({ id });
  });
});

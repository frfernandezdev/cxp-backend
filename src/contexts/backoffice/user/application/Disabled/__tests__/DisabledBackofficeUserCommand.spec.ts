import { BackofficeUserIdFixture } from '../../../domain/__fixtures__/BackofficeUserIdFixture';
import { DisabledBackofficeUserCommand } from '../DisabledBackofficeUserCommand';

describe('DisabledBackofficeUserCommand', () => {
  it('should disabler command', async () => {
    const id = BackofficeUserIdFixture.random().value;
    const command = new DisabledBackofficeUserCommand(id);

    expect(command).toBeInstanceOf(DisabledBackofficeUserCommand);
    expect(command).toMatchObject({ id });
  });
});

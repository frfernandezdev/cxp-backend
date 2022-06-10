import { BackofficeUserIdFixture } from '../../../domain/__fixtures__/BackofficeUserIdFixture';
import { DeleteBackofficeUserCommand } from '../DeleteBackofficeUserCommand';

describe('DeleteBackofficeUserCommand', () => {
  it('should deleter command', async () => {
    const id = BackofficeUserIdFixture.random().value;
    const command = new DeleteBackofficeUserCommand(id);

    expect(command).toBeInstanceOf(DeleteBackofficeUserCommand);
    expect(command).toMatchObject({ id });
  });
});

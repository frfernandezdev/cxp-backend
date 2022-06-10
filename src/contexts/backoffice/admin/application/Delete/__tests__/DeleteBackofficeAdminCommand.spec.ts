import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { DeleteBackofficeAdminCommand } from '../DeleteBackofficeAdminCommand';

describe('DeleteBackofficeAdminCommand', () => {
  it('should deleter command', async () => {
    const id = BackofficeAdminIdFixture.random().value;
    const command = new DeleteBackofficeAdminCommand(id);

    expect(command).toBeInstanceOf(DeleteBackofficeAdminCommand);
    expect(command).toMatchObject({ id });
  });
});

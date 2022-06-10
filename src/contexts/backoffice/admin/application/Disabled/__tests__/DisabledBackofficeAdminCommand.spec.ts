import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { DisabledBackofficeAdminCommand } from '../DisabledBackofficeAdminCommand';

describe('DisabledBackofficeAdminCommand', () => {
  it('should disabler command', async () => {
    const id = BackofficeAdminIdFixture.random().value;
    const command = new DisabledBackofficeAdminCommand(id);

    expect(command).toBeInstanceOf(DisabledBackofficeAdminCommand);
    expect(command).toMatchObject({ id });
  });
});

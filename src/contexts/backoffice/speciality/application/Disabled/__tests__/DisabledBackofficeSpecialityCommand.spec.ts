import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { DisabledBackofficeSpecialityCommand } from '../DisabledBackofficeSpecialityCommand';

describe('DisabledBackofficeSpecialityCommand', () => {
  it('should disabler command', async () => {
    const id = BackofficeSpecialityIdFixture.random().value;
    const command = new DisabledBackofficeSpecialityCommand(id);

    expect(command).toBeInstanceOf(DisabledBackofficeSpecialityCommand);
    expect(command).toMatchObject({ id });
  });
});

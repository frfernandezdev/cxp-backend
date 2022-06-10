import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { DisabledBackofficeMethodCommand } from '../DisabledBackofficeMethodCommand';

describe('DisabledBackofficeMethodCommand', () => {
  it('should disabler command', async () => {
    const id = BackofficeMethodIdFixture.random().value;
    const command = new DisabledBackofficeMethodCommand(id);

    expect(command).toBeInstanceOf(DisabledBackofficeMethodCommand);
    expect(command).toMatchObject({ id });
  });
});

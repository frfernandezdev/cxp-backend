import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { DisabledBackofficePlanCommand } from '../DisabledBackofficePlanCommand';

describe('DisabledBackofficePlanCommand', () => {
  it('should disabler command', async () => {
    const id = BackofficePlanIdFixture.random().value;
    const command = new DisabledBackofficePlanCommand(id);

    expect(command).toBeInstanceOf(DisabledBackofficePlanCommand);
    expect(command).toMatchObject({ id });
  });
});

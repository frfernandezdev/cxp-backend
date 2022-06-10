import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { DeleteBackofficePlanCommand } from '../DeleteBackofficePlanCommandHandler';

describe('DeleteBackofficePlanCommand', () => {
  it('should deleter command', async () => {
    const id = BackofficePlanIdFixture.random().value;
    const command = new DeleteBackofficePlanCommand(id);

    expect(command).toBeInstanceOf(DeleteBackofficePlanCommand);
    expect(command).toMatchObject({ id });
  });
});

import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { DeleteBackofficeMethodCommand } from '../DeleteBackofficeMethodCommand';

describe('DeleteBackofficeMethodCommand', () => {
  it('should deleter command', async () => {
    const id = BackofficeMethodIdFixture.random().value;
    const command = new DeleteBackofficeMethodCommand(id);

    expect(command).toBeInstanceOf(DeleteBackofficeMethodCommand);
    expect(command).toMatchObject({ id });
  });
});

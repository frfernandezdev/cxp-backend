import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { DeleteBackofficeSpecialityCommand } from '../DeleteBackofficeSpecialityCommand';

describe('DeleteBackofficeSpecialityCommand', () => {
  it('should deleter command', async () => {
    const id = BackofficeSpecialityIdFixture.random().value;
    const command = new DeleteBackofficeSpecialityCommand(id);

    expect(command).toBeInstanceOf(DeleteBackofficeSpecialityCommand);
    expect(command).toMatchObject({ id });
  });
});

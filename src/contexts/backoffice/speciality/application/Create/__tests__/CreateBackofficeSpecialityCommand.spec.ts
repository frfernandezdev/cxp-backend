import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { CreateBackofficeSpecialityCommand } from '../CreateBackofficeSpecialityCommand';

describe('CreateBackofficeSpecialityCommand', () => {
  it('should create command', async () => {
    const plainData = {
      id: BackofficeSpecialityIdFixture.random().value,
      name: BackofficeSpecialityNameFixture.random().value,
    };
    const command = new CreateBackofficeSpecialityCommand(plainData);

    expect(command).toBeInstanceOf(CreateBackofficeSpecialityCommand);
    expect(command).toMatchObject(plainData);
  });
});

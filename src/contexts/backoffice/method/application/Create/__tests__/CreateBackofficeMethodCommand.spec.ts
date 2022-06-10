import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { CreateBackofficeMethodCommand } from '../CreateBackofficeMethodCommand';

describe('CreateBackofficeMethodCommand', () => {
  it('should create command', async () => {
    const plainData = {
      id: BackofficeMethodIdFixture.random().value,
      name: BackofficeMethodNameFixture.random().value,
    };
    const command = new CreateBackofficeMethodCommand(plainData);

    expect(command).toBeInstanceOf(CreateBackofficeMethodCommand);
    expect(command).toMatchObject(plainData);
  });
});

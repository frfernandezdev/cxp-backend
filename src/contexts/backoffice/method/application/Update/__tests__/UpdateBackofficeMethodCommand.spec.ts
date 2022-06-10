import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { UpdateBackofficeMethodCommand } from '../UpdateBackofficeMethodCommand';

describe('UpdateBackofficeMethodCommand', () => {
  it('should update a method', () => {
    const plainData = {
      id: BackofficeMethodIdFixture.random().value,
      name: BackofficeMethodNameFixture.random().value,
    };
    const command = new UpdateBackofficeMethodCommand(plainData);

    expect(command).toBeInstanceOf(UpdateBackofficeMethodCommand);
    expect(command).toMatchObject(plainData);
  });
});

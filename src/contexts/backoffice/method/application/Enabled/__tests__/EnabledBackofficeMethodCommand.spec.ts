import { BackofficeMethodId } from '../../../domain/BackofficeMethodId';
import { EnabledBackofficeMethodCommand } from '../EnabledBackofficeMethodCommand';

describe('EnabledBackofficeMethodCommand', () => {
  it('should enabler command', () => {
    const id = BackofficeMethodId.random().value;
    const command = new EnabledBackofficeMethodCommand(id);

    expect(command).toBeInstanceOf(EnabledBackofficeMethodCommand);
    expect(command).toMatchObject({ id });
  });
});

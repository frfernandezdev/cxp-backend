import { BackofficeSpecialityId } from '../../../domain/BackofficeSpecialityId';
import { EnabledBackofficeSpecialityCommand } from '../EnabledBackofficeSpecialityCommand';

describe('EnabledBackofficeSpecialityCommand', () => {
  it('should enabler command', () => {
    const id = BackofficeSpecialityId.random().value;
    const command = new EnabledBackofficeSpecialityCommand(id);

    expect(command).toBeInstanceOf(EnabledBackofficeSpecialityCommand);
    expect(command).toMatchObject({ id });
  });
});

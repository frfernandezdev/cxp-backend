import { BackofficePlanId } from '../../../domain/BackofficePlanId';
import { EnabledBackofficePlanCommand } from '../EnabledBackofficePlanCommand';

describe('EnabledBackofficePlanCommand', () => {
  it('should enabler command', () => {
    const id = BackofficePlanId.random().value;
    const command = new EnabledBackofficePlanCommand(id);

    expect(command).toBeInstanceOf(EnabledBackofficePlanCommand);
    expect(command).toMatchObject({ id });
  });
});

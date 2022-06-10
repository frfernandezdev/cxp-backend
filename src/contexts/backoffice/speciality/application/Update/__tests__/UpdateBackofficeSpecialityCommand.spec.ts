import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { UpdateBackofficeSpecialityCommand } from '../UpdateBackofficeSpecialityCommand';

describe('UpdateBackofficeSpecialityCommand', () => {
  it('should update a speciality', () => {
    const plainData = {
      id: BackofficeSpecialityIdFixture.random().value,
      name: BackofficeSpecialityNameFixture.random().value,
    };
    const command = new UpdateBackofficeSpecialityCommand(plainData);

    expect(command).toBeInstanceOf(UpdateBackofficeSpecialityCommand);
    expect(command).toMatchObject(plainData);
  });
});

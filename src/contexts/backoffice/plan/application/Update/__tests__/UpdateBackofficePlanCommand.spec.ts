import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { UpdateBackofficePlanCommand } from '../UpdateBackofficePlanCommand';

describe('UpdateBackofficePlanCommand', () => {
  it('should update a plan', () => {
    const plainData = {
      id: BackofficePlanIdFixture.random().value,
      price: BackofficePlanPriceFixture.random().value,
      duration: BackofficePlanDurationFixture.random().value,
      coin: BackofficePlanCoinFixture.random().value,
    };
    const command = new UpdateBackofficePlanCommand(plainData);

    expect(command).toBeInstanceOf(UpdateBackofficePlanCommand);
    expect(command).toMatchObject(plainData);
  });
});

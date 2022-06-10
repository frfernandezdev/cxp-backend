import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { CreateBackofficePlanCommand } from '../CreateBackofficePlanCommand';

describe('CreateBackofficePlanCommand', () => {
  it('should create command', async () => {
    const plainData = {
      id: BackofficePlanIdFixture.random().value,
      price: BackofficePlanPriceFixture.random().value,
      duration: BackofficePlanDurationFixture.random().value,
      coin: BackofficePlanCoinFixture.random().value,
    };
    const command = new CreateBackofficePlanCommand(plainData);

    expect(command).toBeInstanceOf(CreateBackofficePlanCommand);
    expect(command).toMatchObject(plainData);
  });
});

import { faker } from '@faker-js/faker';
import { BackofficePlanCoin } from '../BackofficePlanCoin';

export class BackofficePlanCoinFixture {
  static create(value: string): BackofficePlanCoin {
    return new BackofficePlanCoin(value);
  }

  static random(): BackofficePlanCoin {
    return this.create(faker.lorem.word());
  }
}

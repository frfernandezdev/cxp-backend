import * as faker from 'faker';
import { BackofficePlanPrice } from '../BackofficePlanPrice';

export class BackofficePlanPriceFixture {
  static create(value: number): BackofficePlanPrice {
    return new BackofficePlanPrice(value);
  }

  static random(): BackofficePlanPrice {
    return this.create(faker.random.number());
  }
}

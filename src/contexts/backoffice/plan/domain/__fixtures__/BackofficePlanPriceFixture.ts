import { faker } from '@faker-js/faker';
import { BackofficePlanPrice } from '../BackofficePlanPrice';

export class BackofficePlanPriceFixture {
  static create(value: number): BackofficePlanPrice {
    return new BackofficePlanPrice(value);
  }

  static random(): BackofficePlanPrice {
    return this.create(faker.datatype.number());
  }
}

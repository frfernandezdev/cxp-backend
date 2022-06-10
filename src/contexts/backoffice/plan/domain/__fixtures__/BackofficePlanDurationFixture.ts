import { faker } from '@faker-js/faker';
import { BackofficePlanDuration } from '../BackofficePlanDuration';

export class BackofficePlanDurationFixture {
  static create(value: number): BackofficePlanDuration {
    return new BackofficePlanDuration(value);
  }

  static random(): BackofficePlanDuration {
    return this, this.create(faker.random.number());
  }
}

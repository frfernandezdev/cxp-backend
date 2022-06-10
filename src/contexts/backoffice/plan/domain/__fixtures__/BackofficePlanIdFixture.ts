import { faker } from '@faker-js/faker';
import { BackofficePlanId } from '../BackofficePlanId';

export class BackofficePlanIdFixture {
  static create(value: string): BackofficePlanId {
    return new BackofficePlanId(value);
  }

  static random(): BackofficePlanId {
    return this.create(faker.datatype.uuid());
  }
}

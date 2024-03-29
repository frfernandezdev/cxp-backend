import { faker } from '@faker-js/faker';
import { BackofficeUserSessionTaken } from '../BackofficeUserSessionTaken';

export class BackofficeUserSessionTakenFixture {
  static create(value: number): BackofficeUserSessionTaken {
    return new BackofficeUserSessionTaken(value);
  }

  static random(): BackofficeUserSessionTaken {
    return this.create(faker.datatype.number());
  }
}

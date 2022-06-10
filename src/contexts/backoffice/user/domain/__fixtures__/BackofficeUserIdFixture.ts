import { faker } from '@faker-js/faker';
import { BackofficeUserId } from '../BackofficeUserId';

export class BackofficeUserIdFixture {
  static create(value: string): BackofficeUserId {
    return new BackofficeUserId(value);
  }

  static random(): BackofficeUserId {
    return this.create(faker.datatype.uuid());
  }
}

import { faker } from '@faker-js/faker';
import { BackofficeUserLastname } from '../BackofficeUserLastname';

export class BackofficeUserLastnameFixture {
  static create(value: string): BackofficeUserLastname {
    return new BackofficeUserLastname(value);
  }

  static random(): BackofficeUserLastname {
    return this.create(faker.name.lastName());
  }
}

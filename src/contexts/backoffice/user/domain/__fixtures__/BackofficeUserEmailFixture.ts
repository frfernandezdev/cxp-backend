import { faker } from '@faker-js/faker';
import { BackofficeUserEmail } from '../BackofficeUserEmail';

export class BackofficeUserEmailFixture {
  static create(value: string): BackofficeUserEmail {
    return new BackofficeUserEmail(value);
  }

  static random(): BackofficeUserEmail {
    return this.create(faker.internet.email());
  }
}

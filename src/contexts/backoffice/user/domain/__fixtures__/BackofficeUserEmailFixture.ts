import * as faker from 'faker';
import { BackofficeUserEmail } from '../BackofficeUserEmail';

export class BackofficeUserEmailFixture {
  static create(value: string): BackofficeUserEmail {
    return new BackofficeUserEmail(value);
  }

  static random(): BackofficeUserEmail {
    return this.create(faker.internet.email());
  }
}

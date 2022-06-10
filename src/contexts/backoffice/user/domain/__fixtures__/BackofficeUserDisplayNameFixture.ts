import * as faker from 'faker';
import { BackofficeUserDisplayName } from '../BackofficeUserDisplayName';

export class BackofficeUserDisplayNameFixture {
  static create(value: string): BackofficeUserDisplayName {
    return new BackofficeUserDisplayName(value);
  }

  static random(): BackofficeUserDisplayName {
    return this.create(faker.internet.userName());
  }
}

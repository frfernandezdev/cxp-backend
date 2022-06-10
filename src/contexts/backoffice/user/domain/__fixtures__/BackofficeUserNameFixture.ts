import * as faker from 'faker';
import { BackofficeUserName } from '../BackofficeUserName';

export class BackofficeUserNameFixture {
  static create(value: string): BackofficeUserName {
    return new BackofficeUserName(value);
  }

  static random(): BackofficeUserName {
    return this.create(faker.name.firstName());
  }
}

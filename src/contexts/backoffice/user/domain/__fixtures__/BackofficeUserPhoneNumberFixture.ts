import * as faker from 'faker';
import { BackofficeUserPhoneNumber } from '../BackofficeUserPhoneNumber';

export class BackofficeUserPhoneNumberFixture {
  static create(value: string): BackofficeUserPhoneNumber {
    return new BackofficeUserPhoneNumber(value);
  }

  static random(): BackofficeUserPhoneNumber {
    return this.create(faker.phone.phoneNumber('+584#########'));
  }
}

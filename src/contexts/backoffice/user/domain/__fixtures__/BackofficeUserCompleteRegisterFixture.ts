import { faker } from '@faker-js/faker';
import { BackofficeUserCompleteRegister } from '../BackofficeUserCompleteRegister';

export class BackofficeUserCompleteRegisterFixture {
  static create(value: boolean): BackofficeUserCompleteRegister {
    return new BackofficeUserCompleteRegister(value);
  }

  static random(): BackofficeUserCompleteRegister {
    return this.create(faker.datatype.boolean());
  }
}

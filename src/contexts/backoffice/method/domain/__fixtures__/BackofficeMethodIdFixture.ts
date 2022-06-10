import { faker } from '@faker-js/faker';
import { BackofficeMethodId } from '../BackofficeMethodId';

export class BackofficeMethodIdFixture {
  static create(value: string): BackofficeMethodId {
    return new BackofficeMethodId(value);
  }

  static random(): BackofficeMethodId {
    return this.create(faker.datatype.uuid());
  }
}

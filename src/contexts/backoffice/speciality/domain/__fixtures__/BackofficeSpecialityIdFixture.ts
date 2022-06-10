import { faker } from '@faker-js/faker';
import { BackofficeSpecialityId } from '../BackofficeSpecialityId';

export class BackofficeSpecialityIdFixture {
  static create(value: string): BackofficeSpecialityId {
    return new BackofficeSpecialityId(value);
  }

  static random(): BackofficeSpecialityId {
    return this.create(faker.datatype.uuid());
  }
}

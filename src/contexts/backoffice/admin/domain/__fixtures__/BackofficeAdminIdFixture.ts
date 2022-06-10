import { faker } from '@faker-js/faker';
import { BackofficeAdminId } from '../BackofficeAdminId';

export class BackofficeAdminIdFixture {
  static create(value: string): BackofficeAdminId {
    return new BackofficeAdminId(value);
  }

  static random(): BackofficeAdminId {
    return this.create(faker.datatype.uuid());
  }
}

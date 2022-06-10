import { faker } from '@faker-js/faker';
import { BackofficeAdminName } from '../BackofficeAdminName';

export class BackofficeAdminNameFixture {
  static create(value: string): BackofficeAdminName {
    return new BackofficeAdminName(value);
  }

  static random(): BackofficeAdminName {
    return this.create(faker.name.firstName());
  }
}

import { faker } from '@faker-js/faker';
import { BackofficeAdminLastname } from '../BackofficeAdminLastname';

export class BackofficeAdminLastnameFixture {
  static create(value: string): BackofficeAdminLastname {
    return new BackofficeAdminLastname(value);
  }

  static random(): BackofficeAdminLastname {
    return this.create(faker.name.lastName());
  }
}

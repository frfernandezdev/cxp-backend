import { faker } from '@faker-js/faker';
import { BackofficeAdminDisplayName } from '../BackofficeAdminDisplayName';

export class BackofficeAdminDisplayNameFixture {
  static create(value: string): BackofficeAdminDisplayName {
    return new BackofficeAdminDisplayName(value);
  }

  static random(): BackofficeAdminDisplayName {
    return this.create(faker.internet.userName());
  }
}

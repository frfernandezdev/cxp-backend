import { faker } from '@faker-js/faker';
import {
  BackofficeAdminRole,
  BackofficeAdminRoles,
} from '../BackofficeAdminRole';

export class BackofficeAdminRoleFixture {
  static create(value: BackofficeAdminRoles): BackofficeAdminRole {
    return new BackofficeAdminRole(value);
  }

  static random(): BackofficeAdminRole {
    return this.create(faker.datatype.number({ max: 3 }));
  }
}

import * as faker from 'faker';
import {
  BackofficeAdminRole,
  BackofficeAdminRoles,
} from '../BackofficeAdminRole';

export class BackofficeAdminRoleFixture {
  static create(value: BackofficeAdminRoles): BackofficeAdminRole {
    return new BackofficeAdminRole(value);
  }

  static random(): BackofficeAdminRole {
    return this.create(faker.random.number(3));
  }
}

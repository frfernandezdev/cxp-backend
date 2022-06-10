import { BackofficeUser } from '../domain/BackofficeUser';

export class BackofficeUserResponse {
  readonly users: Array<BackofficeUser>;

  constructor(users: Array<BackofficeUser>) {
    this.users = users;
  }
}

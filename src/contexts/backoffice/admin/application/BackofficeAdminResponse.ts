import { BackofficeAdmin } from '../domain/BackofficeAdmin';

export class BackofficeAdminResponse {
  readonly admins: Array<BackofficeAdmin>;

  constructor(admins: Array<BackofficeAdmin>) {
    this.admins = admins;
  }
}

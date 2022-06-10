import * as faker from 'faker';
import { BackofficeAdminPhotoURL } from '../BackofficeAdminPhotoURL';

export class BackofficeAdminPhotoURLFixture {
  static create(value: string): BackofficeAdminPhotoURL {
    return new BackofficeAdminPhotoURL(value);
  }

  static random(): BackofficeAdminPhotoURL {
    return this.create(faker.image.avatar());
  }
}

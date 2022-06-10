import { faker } from '@faker-js/faker';
import { BackofficeUserPhotoURL } from '../BackofficeUserPhotoURL';

export class BackofficeUserPhotoURLFixture {
  static create(value: string): BackofficeUserPhotoURL {
    return new BackofficeUserPhotoURL(value);
  }

  static random(): BackofficeUserPhotoURL {
    return this.create(faker.image.avatar());
  }
}

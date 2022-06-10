import { faker } from '@faker-js/faker';
import { BackofficeUserLocation } from '../BackofficeUserLocation';

export class BackofficeUserLocationFixture {
  static create(value: string): BackofficeUserLocation {
    return new BackofficeUserLocation(value);
  }

  static random(): BackofficeUserLocation {
    return this.create(faker.locale);
  }
}

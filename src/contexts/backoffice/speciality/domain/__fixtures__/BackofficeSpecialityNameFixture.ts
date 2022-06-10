import * as faker from 'faker';
import { BackofficeSpecialityName } from '../BackofficeSpecialityName';

export class BackofficeSpecialityNameFixture {
  static create(value: string): BackofficeSpecialityName {
    return new BackofficeSpecialityName(value);
  }

  static random(): BackofficeSpecialityName {
    return this.create(faker.company.companyName());
  }
}

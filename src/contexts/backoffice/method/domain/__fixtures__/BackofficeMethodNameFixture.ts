import * as faker from 'faker';
import { BackofficeMethodName } from '../BackofficeMethodName';

export class BackofficeMethodNameFixture {
  static create(value: string): BackofficeMethodName {
    return new BackofficeMethodName(value);
  }

  static random(): BackofficeMethodName {
    return this.create(faker.company.companyName());
  }
}

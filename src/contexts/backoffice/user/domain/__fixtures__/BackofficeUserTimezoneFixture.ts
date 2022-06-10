import * as faker from 'faker';
import { BackofficeUserTimezone } from '../BackofficeUserTimezone';

export class BackofficeUserTimezoneFixture {
  static create(value: string): BackofficeUserTimezone {
    return new BackofficeUserTimezone(value);
  }

  static extractTimezone(value: string): string {
    const [extract] = value.match(/GMT-[\d]{0,4}/);
    return extract;
  }

  static random(): BackofficeUserTimezone {
    return this.create(
      this.extractTimezone(faker.date.recent().toTimeString()),
    );
  }
}

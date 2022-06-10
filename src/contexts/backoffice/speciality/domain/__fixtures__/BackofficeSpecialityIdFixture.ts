import { v4 } from 'uuid';
import { BackofficeSpecialityId } from '../BackofficeSpecialityId';

export class BackofficeSpecialityIdFixture {
  static create(value: string): BackofficeSpecialityId {
    return new BackofficeSpecialityId(value);
  }

  static random(): BackofficeSpecialityId {
    return this.create(v4());
  }
}

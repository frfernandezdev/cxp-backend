import { v4 } from 'uuid';
import { BackofficeMethodId } from '../BackofficeMethodId';

export class BackofficeMethodIdFixture {
  static create(value: string): BackofficeMethodId {
    return new BackofficeMethodId(value);
  }

  static random(): BackofficeMethodId {
    return this.create(v4());
  }
}

import { v4 } from 'uuid';
import * as validate from 'uuid-validate';
import { InvalidArgumentError } from './InvalidArgumentError';

export class UuidValueObject {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);
    this.value = value;
  }

  static random(): UuidValueObject {
    return new UuidValueObject(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${id}>`,
      );
    }
  }

  toString(): string {
    return this.value;
  }
}

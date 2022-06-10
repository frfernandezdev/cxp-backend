import { isURL } from 'class-validator';
import { InvalidArgumentError } from './InvalidArgumentError';
import { StringValueObject } from './StringValueObject';

export class UrlValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUrl(value);
  }

  private ensureIsValidUrl(value: string): void {
    if (!isURL(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> doest not allow the value <${value}>`,
      );
    }
  }
}

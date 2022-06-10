export abstract class BooleanValueObject {
  readonly value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  isTrue() {
    return this.value === true;
  }

  isFalse() {
    return this.value === false;
  }
}

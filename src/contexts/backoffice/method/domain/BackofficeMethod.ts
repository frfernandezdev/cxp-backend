import { AggregateRoot } from '@nestjs/cqrs';
import { BackofficeMethodId } from './BackofficeMethodId';
import { BackofficeMethodName } from './BackofficeMethodName';

export class BackofficeMethod extends AggregateRoot {
  constructor(
    private readonly id: BackofficeMethodId,
    private readonly name: BackofficeMethodName,
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
  }): BackofficeMethod {
    return new BackofficeMethod(
      new BackofficeMethodId(plainData.id),
      new BackofficeMethodName(plainData.name),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}

import { AggregateRoot } from '@nestjs/cqrs';
import { BackofficeSpecialityId } from './BackofficeSpecialityId';
import { BackofficeSpecialityName } from './BackofficeSpecialityName';

export class BackofficeSpeciality extends AggregateRoot {
  constructor(
    private readonly id: BackofficeSpecialityId,
    private readonly name: BackofficeSpecialityName,
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
  }): BackofficeSpeciality {
    return new BackofficeSpeciality(
      new BackofficeSpecialityId(plainData.id),
      new BackofficeSpecialityName(plainData.name),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}

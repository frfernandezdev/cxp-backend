import { Injectable } from '@nestjs/common';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';

@Injectable()
export class BackofficeSpecialityEnabler {
  constructor(
    private readonly repository: BackofficeSQLiteSpecialityRepository,
  ) {}

  async run(methodId: BackofficeSpecialityId[]): Promise<void> {
    const ids = methodId.map((obj) => obj.value);
    await this.repository.enabled(ids);
  }
}

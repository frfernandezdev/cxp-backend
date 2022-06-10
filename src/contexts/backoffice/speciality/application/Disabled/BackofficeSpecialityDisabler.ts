import { Injectable } from '@nestjs/common';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';

@Injectable()
export class BackofficeSpecialityDisabler {
  constructor(
    private readonly repository: BackofficeSQLiteSpecialityRepository,
  ) {}

  async run(methodId: BackofficeSpecialityId[]): Promise<void> {
    const ids = methodId.map((obj) => obj.value);
    await this.repository.disabled(ids);
  }
}

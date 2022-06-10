import { Injectable } from '@nestjs/common';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';

@Injectable()
export class BackofficeSpecialityDeleter {
  constructor(
    private readonly repository: BackofficeSQLiteSpecialityRepository,
  ) {}

  async run(specialityId: BackofficeSpecialityId[]): Promise<void> {
    const ids = specialityId.map((obj) => obj.value);
    await this.repository.remove(ids);
  }
}

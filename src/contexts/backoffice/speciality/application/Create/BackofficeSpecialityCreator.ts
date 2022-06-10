import { Injectable } from '@nestjs/common';
import { BackofficeSpeciality } from '../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityName } from '../../domain/BackofficeSpecialityName';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';

@Injectable()
export class BackofficeSpecialityCreator {
  constructor(
    private readonly repository: BackofficeSQLiteSpecialityRepository,
  ) {}

  async run({
    specialityId,
    specialityName,
  }: {
    specialityId: BackofficeSpecialityId;
    specialityName: BackofficeSpecialityName;
  }): Promise<void> {
    const method = new BackofficeSpeciality(specialityId, specialityName);

    await this.repository.save(method);
  }
}

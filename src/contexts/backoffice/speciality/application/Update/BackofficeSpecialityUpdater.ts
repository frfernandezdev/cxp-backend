import { Injectable } from '@nestjs/common';
import { BackofficeSpeciality } from '../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityName } from '../../domain/BackofficeSpecialityName';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';

@Injectable()
export class BackofficeSpecialityUpdater {
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
    const speciality = new BackofficeSpeciality(specialityId, specialityName);

    await this.repository.save(speciality);
  }
}

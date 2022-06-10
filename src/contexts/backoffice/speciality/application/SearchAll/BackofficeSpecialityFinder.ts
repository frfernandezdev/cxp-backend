import { Injectable } from '@nestjs/common';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityResponse } from '../BackofficeSpecialityResponse';

@Injectable()
export class BackofficeSpecialityFinder {
  constructor(
    private readonly repository: BackofficeSQLiteSpecialityRepository,
  ) {}

  async run(): Promise<BackofficeSpecialityResponse> {
    const specialities = await this.repository.findAll();

    return new BackofficeSpecialityResponse(specialities);
  }
}

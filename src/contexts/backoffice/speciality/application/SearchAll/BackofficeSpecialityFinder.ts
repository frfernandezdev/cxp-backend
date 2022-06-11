import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLiteSpecialityRepository } from '../../infrastructure/persistence/BackofficeSQLiteSpecialityRepository';
import { BackofficeSpecialityResponse } from '../BackofficeSpecialityResponse';

@Injectable()
export class BackofficeSpecialityFinder {
  constructor(
    private readonly repository: BackofficeSQLiteSpecialityRepository,
  ) {}

  async run(
    limit?: number,
    offset?: number,
  ): Promise<BackofficeSpecialityResponse> {
    const criteria = new Criteria(Filters.none(), Order.none(), limit, offset);
    const specialities = await this.repository.findAll(criteria);

    return new BackofficeSpecialityResponse(specialities);
  }
}

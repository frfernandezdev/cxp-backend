import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLiteUserRepository } from '../../infrastructure/persistence/BackofficeSQLiteUserRepository';
import { BackofficeUserResponse } from '../BackofficeUserResponse';

@Injectable()
export class BackofficeUserByCriteriaSearcher {
  constructor(private readonly repository: BackofficeSQLiteUserRepository) {}

  async run(
    filters: Filters,
    order?: Order,
    limit?: number,
    offset?: number,
  ): Promise<BackofficeUserResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const speciliaties = await this.repository.find(criteria);

    return new BackofficeUserResponse(speciliaties);
  }
}

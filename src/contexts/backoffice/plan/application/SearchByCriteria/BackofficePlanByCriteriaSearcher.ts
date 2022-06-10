import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLitePlanRepository } from '../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanResponse } from '../BackofficePlanResponse';

@Injectable()
export class BackofficePlanByCriteriaSearcher {
  constructor(private readonly repository: BackofficeSQLitePlanRepository) {}

  async run(
    filters: Filters,
    order?: Order,
    limit?: number,
    offset?: number,
  ): Promise<BackofficePlanResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const plans = await this.repository.find(criteria);

    return new BackofficePlanResponse(plans);
  }
}

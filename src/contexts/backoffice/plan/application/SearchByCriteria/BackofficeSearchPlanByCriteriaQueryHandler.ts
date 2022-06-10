import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficePlanResponse } from '../BackofficePlanResponse';
import { BackofficePlanByCriteriaSearcher } from './BackofficePlanByCriteriaSearcher';
import { BackofficeSearchPlanByCriteriaQuery } from './BackofficeSearchPlanByCriteriaQuery';

@QueryHandler(BackofficeSearchPlanByCriteriaQuery)
export class BackofficeSearchPlanByCriteriaQueryHandler
  implements IQueryHandler<BackofficeSearchPlanByCriteriaQuery>
{
  constructor(private readonly searcher: BackofficePlanByCriteriaSearcher) {}

  async execute(
    query: BackofficeSearchPlanByCriteriaQuery,
  ): Promise<BackofficePlanResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}

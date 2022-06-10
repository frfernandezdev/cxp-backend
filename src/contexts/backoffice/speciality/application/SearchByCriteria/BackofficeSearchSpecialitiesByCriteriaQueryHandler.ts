import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSpecialityResponse } from '../BackofficeSpecialityResponse';
import { BackofficeSearchSpecialityByCriteriaQuery } from './BackofficeSearchSpecialitiesByCriteriaQuery';
import { BackofficeSpecialitiesByCriteriaSearcher } from './BackofficeSpecialitiesByCriteriaSearcher';

@QueryHandler(BackofficeSearchSpecialityByCriteriaQuery)
export class BackofficeSearchSpecialityByCriteriaQueryHandler
  implements IQueryHandler<BackofficeSearchSpecialityByCriteriaQuery>
{
  constructor(
    private readonly searcher: BackofficeSpecialitiesByCriteriaSearcher,
  ) {}

  async execute(
    query: BackofficeSearchSpecialityByCriteriaQuery,
  ): Promise<BackofficeSpecialityResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}

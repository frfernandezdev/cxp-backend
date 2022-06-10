import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeMethodResponse } from '../BackofficeMethodResponse';
import { BackofficeMethodByCriteriaSearcher } from './BackofficeMethodByCriteriaSearcher';
import { BackofficeSearchMethodByCriteriaQuery } from './BackofficeSearchMethodByCriteriaQuery';

@QueryHandler(BackofficeSearchMethodByCriteriaQuery)
export class BackofficeSearchMethodByCriteriaQueryHandler
  implements IQueryHandler<BackofficeSearchMethodByCriteriaQuery>
{
  constructor(private readonly searcher: BackofficeMethodByCriteriaSearcher) {}

  async execute(
    query: BackofficeSearchMethodByCriteriaQuery,
  ): Promise<BackofficeMethodResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}

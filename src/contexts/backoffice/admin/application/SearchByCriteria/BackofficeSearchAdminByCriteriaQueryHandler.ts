import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeAdminResponse } from '../BackofficeAdminResponse';
import { BackofficeAdminByCriteriaSearcher } from './BackofficeAdminByCriteriaSearcher';
import { BackofficeSearchAdminByCriteriaQuery } from './BackofficeSearchAdminByCriteriaQuery';

@QueryHandler(BackofficeSearchAdminByCriteriaQuery)
export class BackofficeSearchAdminByCriteriaQueryHandler
  implements IQueryHandler<BackofficeSearchAdminByCriteriaQuery>
{
  constructor(private readonly searcher: BackofficeAdminByCriteriaSearcher) {}

  async execute(
    query: BackofficeSearchAdminByCriteriaQuery,
  ): Promise<BackofficeAdminResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}

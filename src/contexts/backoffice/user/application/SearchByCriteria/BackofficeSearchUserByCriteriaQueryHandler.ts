import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeUserResponse } from '../BackofficeUserResponse';
import { BackofficeSearchUserByCriteriaQuery } from './BackofficeSearchUserByCriteriaQuery';
import { BackofficeUserByCriteriaSearcher } from './BackofficeUserByCriteriaSearcher';

@QueryHandler(BackofficeSearchUserByCriteriaQuery)
export class BackofficeSearchUserByCriteriaQueryHandler
  implements IQueryHandler<BackofficeSearchUserByCriteriaQuery>
{
  constructor(private readonly searcher: BackofficeUserByCriteriaSearcher) {}

  async execute(
    query: BackofficeSearchUserByCriteriaQuery,
  ): Promise<BackofficeUserResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}

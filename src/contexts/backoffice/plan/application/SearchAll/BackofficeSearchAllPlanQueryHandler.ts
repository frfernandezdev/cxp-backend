import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BackofficePlanResponse } from '../BackofficePlanResponse';
import { BackofficePlanFinder } from './BackofficePlanFinder';
import { BackofficeSearchAllPlanQuery } from './BackofficeSearchAllPlanQuery';

@QueryHandler(BackofficeSearchAllPlanQuery)
export class BackofficeSearchAllPlanQueryHandler
  implements IQueryHandler<BackofficeSearchAllPlanQuery>
{
  constructor(private readonly finder: BackofficePlanFinder) {}

  async execute(
    query: BackofficeSearchAllPlanQuery,
  ): Promise<BackofficePlanResponse> {
    const { offset, limit } = query;

    return this.finder.run(offset, limit);
  }
}

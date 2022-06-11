import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BackofficeMethodResponse } from '../BackofficeMethodResponse';
import { BackofficeMethodFinder } from './BackofficeMethodFinder';
import { BackofficeSearchAllMethodQuery } from './BackofficeSearchAllMethodQuery';

@QueryHandler(BackofficeSearchAllMethodQuery)
export class BackofficeSearchAllMethodQueryHandler
  implements IQueryHandler<BackofficeSearchAllMethodQuery>
{
  constructor(private readonly finder: BackofficeMethodFinder) {}

  async execute(
    query: BackofficeSearchAllMethodQuery,
  ): Promise<BackofficeMethodResponse> {
    const { offset, limit } = query;

    return this.finder.run(offset, limit);
  }
}

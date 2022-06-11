import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BackofficeAdminResponse } from '../BackofficeAdminResponse';
import { BackofficeAdminFinder } from './BackofficeAdminFinder';
import { BackofficeSearchAllAdminQuery } from './BackofficeSearchAllAdminQuery';

@QueryHandler(BackofficeSearchAllAdminQuery)
export class BackofficeSearchAllAdminQueryHandler
  implements IQueryHandler<BackofficeSearchAllAdminQuery>
{
  constructor(private readonly finder: BackofficeAdminFinder) {}

  async execute(
    query: BackofficeSearchAllAdminQuery,
  ): Promise<BackofficeAdminResponse> {
    const { offset, limit } = query;

    return this.finder.run(offset, limit);
  }
}

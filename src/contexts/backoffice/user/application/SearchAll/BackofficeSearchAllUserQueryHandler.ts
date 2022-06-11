import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BackofficeUserResponse } from '../BackofficeUserResponse';
import { BackofficeSearchAllUserQuery } from './BackofficeSearchAllUserQuery';
import { BackofficeUserFinder } from './BackofficeUserFinder';

@QueryHandler(BackofficeSearchAllUserQuery)
export class BackofficeSearchAllUserQueryHandler
  implements IQueryHandler<BackofficeSearchAllUserQuery>
{
  constructor(private readonly finder: BackofficeUserFinder) {}

  async execute(
    query: BackofficeSearchAllUserQuery,
  ): Promise<BackofficeUserResponse> {
    const { offset, limit } = query;

    return this.finder.run(offset, limit);
  }
}

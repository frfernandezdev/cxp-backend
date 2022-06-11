import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BackofficeSpecialityResponse } from '../BackofficeSpecialityResponse';
import { BackofficeSearchAllSpecialityQuery } from './BackofficeSearchAllSpecialityQuery';
import { BackofficeSpecialityFinder } from './BackofficeSpecialityFinder';

@QueryHandler(BackofficeSearchAllSpecialityQuery)
export class BackofficeSearchAllSpecialityQueryHandler
  implements IQueryHandler<BackofficeSearchAllSpecialityQuery>
{
  constructor(private readonly finder: BackofficeSpecialityFinder) {}

  async execute(
    query: BackofficeSearchAllSpecialityQuery,
  ): Promise<BackofficeSpecialityResponse> {
    const { offset, limit } = query;

    return this.finder.run(offset, limit);
  }
}

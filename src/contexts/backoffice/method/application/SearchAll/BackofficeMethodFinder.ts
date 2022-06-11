import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLiteMethodRepository } from '../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodResponse } from '../BackofficeMethodResponse';

@Injectable()
export class BackofficeMethodFinder {
  constructor(private readonly repository: BackofficeSQLiteMethodRepository) {}

  async run(
    limit?: number,
    offset?: number,
  ): Promise<BackofficeMethodResponse> {
    const criteria = new Criteria(Filters.none(), Order.none(), limit, offset);

    const methods = await this.repository.findAll(criteria);

    return new BackofficeMethodResponse(methods);
  }
}

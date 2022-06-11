import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLiteUserRepository } from '../../infrastructure/persistence/BackofficeSQLiteUserRepository';
import { BackofficeUserResponse } from '../BackofficeUserResponse';

@Injectable()
export class BackofficeUserFinder {
  constructor(private readonly repository: BackofficeSQLiteUserRepository) {}

  async run(limit?: number, offset?: number): Promise<BackofficeUserResponse> {
    const criteria = new Criteria(Filters.none(), Order.none(), limit, offset);
    const users = await this.repository.findAll(criteria);

    return new BackofficeUserResponse(users);
  }
}

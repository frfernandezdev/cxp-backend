import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { BackofficeSQLiteAdminRepository } from '../../infrastructure/persistence/BackofficeSQLiteAdminRepository';
import { BackofficeAdminResponse } from '../BackofficeAdminResponse';

@Injectable()
export class BackofficeAdminFinder {
  constructor(private readonly repository: BackofficeSQLiteAdminRepository) {}

  async run(limit?: number, offset?: number): Promise<BackofficeAdminResponse> {
    const criteria = new Criteria(Filters.none(), Order.none(), limit, offset);

    const admins = await this.repository.findAll(criteria);

    return new BackofficeAdminResponse(admins);
  }
}

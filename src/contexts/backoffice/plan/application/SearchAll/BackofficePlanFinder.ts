import { Injectable } from '@nestjs/common';
import { BackofficeSQLitePlanRepository } from '../../infrastructure/persistence/BackofficeSQLitePlanRepository';
import { BackofficePlanResponse } from '../BackofficePlanResponse';

@Injectable()
export class BackofficePlanFinder {
  constructor(private readonly repository: BackofficeSQLitePlanRepository) {}

  async run(): Promise<BackofficePlanResponse> {
    const plans = await this.repository.findAll();

    return new BackofficePlanResponse(plans);
  }
}

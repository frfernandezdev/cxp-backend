import { Injectable } from '@nestjs/common';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficeSQLitePlanRepository } from '../../infrastructure/persistence/BackofficeSQLitePlanRepository';

@Injectable()
export class BackofficePlanDeleter {
  constructor(private readonly repository: BackofficeSQLitePlanRepository) {}

  async run(planId: BackofficePlanId[]): Promise<void> {
    const ids = planId.map((obj) => obj.value);
    await this.repository.remove(ids);
  }
}

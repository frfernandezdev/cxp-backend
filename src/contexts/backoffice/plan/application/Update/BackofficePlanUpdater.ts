import { Injectable } from '@nestjs/common';
import { BackofficePlan } from '../../domain/BackofficePlan';
import { BackofficePlanCoin } from '../../domain/BackofficePlanCoin';
import { BackofficePlanDuration } from '../../domain/BackofficePlanDuration';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficePlanPrice } from '../../domain/BackofficePlanPrice';
import { BackofficeSQLitePlanRepository } from '../../infrastructure/persistence/BackofficeSQLitePlanRepository';

@Injectable()
export class BackofficePlanUpdater {
  constructor(private readonly repository: BackofficeSQLitePlanRepository) {}

  async run({
    planId,
    planPrice,
    planDuration,
    planCoin,
  }: {
    planId: BackofficePlanId;
    planPrice: BackofficePlanPrice;
    planDuration: BackofficePlanDuration;
    planCoin: BackofficePlanCoin;
  }): Promise<void> {
    const method = new BackofficePlan(
      planId,
      planPrice,
      planDuration,
      planCoin,
    );

    await this.repository.save(method);
  }
}

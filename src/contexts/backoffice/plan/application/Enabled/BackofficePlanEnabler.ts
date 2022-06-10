import { Injectable } from '@nestjs/common';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficeSQLitePlanRepository } from '../../infrastructure/persistence/BackofficeSQLitePlanRepository';

@Injectable()
export class BackofficePlanEnabler {
  constructor(private readonly repository: BackofficeSQLitePlanRepository) {}

  async run(methodId: BackofficePlanId[]): Promise<void> {
    const ids = methodId.map((obj) => obj.value);
    await this.repository.enabled(ids);
  }
}

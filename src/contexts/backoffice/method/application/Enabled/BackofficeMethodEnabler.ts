import { Injectable } from '@nestjs/common';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeSQLiteMethodRepository } from '../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';

@Injectable()
export class BackofficeMethodEnabler {
  constructor(private readonly repository: BackofficeSQLiteMethodRepository) {}

  async run(methodId: BackofficeMethodId[]): Promise<void> {
    const ids = methodId.map((obj) => obj.value);
    await this.repository.enabled(ids);
  }
}

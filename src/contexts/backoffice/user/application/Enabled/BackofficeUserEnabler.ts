import { Injectable } from '@nestjs/common';
import { BackofficeUserId } from '../../domain/BackofficeUserId';
import { BackofficeSQLiteUserRepository } from '../../infrastructure/persistence/BackofficeSQLiteUserRepository';

@Injectable()
export class BackofficeUserEnabler {
  constructor(private readonly repository: BackofficeSQLiteUserRepository) {}

  async run(adminId: BackofficeUserId[]): Promise<void> {
    const ids = adminId.map((obj) => obj.value);
    await this.repository.enabled(ids);
  }
}

import { Injectable } from '@nestjs/common';
import { BackofficeSQLiteAdminRepository } from '../../infrastructure/persistence/BackofficeSQLiteAdminRepository';
import { BackofficeAdminResponse } from '../BackofficeAdminResponse';

@Injectable()
export class BackofficeAdminFinder {
  constructor(private readonly repository: BackofficeSQLiteAdminRepository) {}

  async run(): Promise<BackofficeAdminResponse> {
    const admins = await this.repository.findAll();

    return new BackofficeAdminResponse(admins);
  }
}

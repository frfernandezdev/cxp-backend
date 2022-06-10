import { Injectable } from '@nestjs/common';
import { BackofficeSQLiteUserRepository } from '../../infrastructure/persistence/BackofficeSQLiteUserRepository';
import { BackofficeUserResponse } from '../BackofficeUserResponse';

@Injectable()
export class BackofficeUserFinder {
  constructor(private readonly repository: BackofficeSQLiteUserRepository) {}

  async run(): Promise<BackofficeUserResponse> {
    const users = await this.repository.findAll();

    return new BackofficeUserResponse(users);
  }
}

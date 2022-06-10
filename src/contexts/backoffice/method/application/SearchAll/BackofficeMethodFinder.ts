import { Injectable } from '@nestjs/common';
import { BackofficeSQLiteMethodRepository } from '../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';
import { BackofficeMethodResponse } from '../BackofficeMethodResponse';

@Injectable()
export class BackofficeMethodFinder {
  constructor(private readonly repository: BackofficeSQLiteMethodRepository) {}

  async run(): Promise<BackofficeMethodResponse> {
    const methods = await this.repository.findAll();

    return new BackofficeMethodResponse(methods);
  }
}

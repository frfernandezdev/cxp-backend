import { Injectable } from '@nestjs/common';
import { BackofficeMethod } from '../../domain/BackofficeMethod';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeMethodName } from '../../domain/BackofficeMethodName';
import { BackofficeSQLiteMethodRepository } from '../../infrasctructure/persistence/BackofficeSQLiteMethodRepository';

@Injectable()
export class BackofficeMethodCreator {
  constructor(private readonly repository: BackofficeSQLiteMethodRepository) {}

  async run({
    methodId,
    methodName,
  }: {
    methodId: BackofficeMethodId;
    methodName: BackofficeMethodName;
  }): Promise<void> {
    const method = new BackofficeMethod(methodId, methodName);

    await this.repository.save(method);
  }
}

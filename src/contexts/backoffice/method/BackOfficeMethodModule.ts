import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBackofficeMethodCommandHandler } from './application/Create/CreateBackofficeMethodCommandHandler';
import { DeleteBackofficeMethodCommandHandler } from './application/Delete/DeleteBackofficeMethodCommandHandler';
import { DisabledBackofficeMethodCommandHandler } from './application/Disabled/DisabledBackofficeMethodCommandHandler';
import { EnabledBackofficeMethodCommandHandler } from './application/Enabled/EnabledBackofficeMethodCommandHandler';
import { BackofficeSearchAllMethodQueryHandler } from './application/SearchAll/BackofficeSearchAllMethodQueryHandler';
import { BackofficeSearchMethodByCriteriaQueryHandler } from './application/SearchByCriteria/BackofficeSearchMethodByCriteriaQueryHandler';
import { UpdateBackofficeMethodCommandHandler } from './application/Update/UpdateBackofficeMethodCommandHandler';
import { BackofficeSQLiteMethodRepository } from './infrasctructure/persistence/BackofficeSQLiteMethodRepository';

@Module({
  imports: [CqrsModule],
  providers: [
    BackofficeSQLiteMethodRepository,
    CreateBackofficeMethodCommandHandler,
    DeleteBackofficeMethodCommandHandler,
    DisabledBackofficeMethodCommandHandler,
    EnabledBackofficeMethodCommandHandler,
    BackofficeSearchAllMethodQueryHandler,
    BackofficeSearchMethodByCriteriaQueryHandler,
    UpdateBackofficeMethodCommandHandler,
  ],
})
export class BackOfficeMethodModule {}

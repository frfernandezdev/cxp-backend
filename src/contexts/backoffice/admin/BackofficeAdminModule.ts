import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBackofficeAdminCommandHandler } from './application/Create/CreateBackofficeAdminCommandHandler';
import { DeleteBackofficeAdminCommandHandler } from './application/Delete/DeleteBackofficeAdminCommandHandler';
import { DisabledBackofficeAdminCommandHandler } from './application/Disabled/DisabledBackofficeAdminCommandHandler';
import { EnabledBackofficeAdminCommandHandler } from './application/Enabled/EnabledBackofficeAdminCommandHandler';
import { BackofficeSearchAllAdminQueryHandler } from './application/SearchAll/BackofficeSearchAllAdminQueryHandler';
import { BackofficeSearchAdminByCriteriaQueryHandler } from './application/SearchByCriteria/BackofficeSearchAdminByCriteriaQueryHandler';
import { UpdateBackofficeAdminCommandHandler } from './application/Update/UpdateBackofficeAdminCommandHandler';
import { BackofficeSQLiteAdminRepository } from './infrastructure/persistence/BackofficeSQLiteAdminRepository';

@Module({
  imports: [CqrsModule],
  providers: [
    BackofficeSQLiteAdminRepository,
    CreateBackofficeAdminCommandHandler,
    DeleteBackofficeAdminCommandHandler,
    DisabledBackofficeAdminCommandHandler,
    EnabledBackofficeAdminCommandHandler,
    BackofficeSearchAllAdminQueryHandler,
    BackofficeSearchAdminByCriteriaQueryHandler,
    UpdateBackofficeAdminCommandHandler,
  ],
})
export class BackofficeAdminModule {}

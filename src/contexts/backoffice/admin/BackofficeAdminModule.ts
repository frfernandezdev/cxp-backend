import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BackofficeSQLiteModule } from '../shared/infrastructure/persistence/BackofficeSQLiteModule';
import { BackofficeAdminCreator } from './application/Create/BackofficeAdminCreator';
import { CreateBackofficeAdminCommandHandler } from './application/Create/CreateBackofficeAdminCommandHandler';
import { BackofficeAdminDeleter } from './application/Delete/BackofficeAdminDeleter';
import { DeleteBackofficeAdminCommandHandler } from './application/Delete/DeleteBackofficeAdminCommandHandler';
import { BackofficeAdminDisabler } from './application/Disabled/BackofficeAdminDisabler';
import { DisabledBackofficeAdminCommandHandler } from './application/Disabled/DisabledBackofficeAdminCommandHandler';
import { BackofficeAdminEnabler } from './application/Enabled/BackofficeAdminEnabler';
import { EnabledBackofficeAdminCommandHandler } from './application/Enabled/EnabledBackofficeAdminCommandHandler';
import { BackofficeAdminFinder } from './application/SearchAll/BackofficeAdminFinder';
import { BackofficeSearchAllAdminQueryHandler } from './application/SearchAll/BackofficeSearchAllAdminQueryHandler';
import { BackofficeAdminByCriteriaSearcher } from './application/SearchByCriteria/BackofficeAdminByCriteriaSearcher';
import { BackofficeSearchAdminByCriteriaQueryHandler } from './application/SearchByCriteria/BackofficeSearchAdminByCriteriaQueryHandler';
import { BackofficeAdminUpdater } from './application/Update/BackofficeAdminUpdater';
import { UpdateBackofficeAdminCommandHandler } from './application/Update/UpdateBackofficeAdminCommandHandler';
import { BackofficeSQLiteAdminRepository } from './infrastructure/persistence/BackofficeSQLiteAdminRepository';

@Module({
  imports: [CqrsModule, BackofficeSQLiteModule],
  providers: [
    BackofficeSQLiteAdminRepository,
    BackofficeAdminCreator,
    CreateBackofficeAdminCommandHandler,
    BackofficeAdminDeleter,
    DeleteBackofficeAdminCommandHandler,
    BackofficeAdminDisabler,
    DisabledBackofficeAdminCommandHandler,
    BackofficeAdminEnabler,
    EnabledBackofficeAdminCommandHandler,
    BackofficeAdminFinder,
    BackofficeSearchAllAdminQueryHandler,
    BackofficeAdminByCriteriaSearcher,
    BackofficeSearchAdminByCriteriaQueryHandler,
    BackofficeAdminUpdater,
    UpdateBackofficeAdminCommandHandler,
  ],
  exports: [
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

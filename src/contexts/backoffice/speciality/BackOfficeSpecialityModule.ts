import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBackofficeSpecialityCommandHandler } from './application/Create/CreateBackofficeSpecialityCommandHandler';
import { DeleteBackofficeSpecialityCommandHandler } from './application/Delete/DeleteBackofficeSpecialityCommandHandler';
import { DisabledBackofficeSpecialityCommandHandler } from './application/Disabled/DisabledBackofficeSpecialityCommandHandler';
import { EnabledBackofficeSpecialityCommandHandler } from './application/Enabled/EnabledBackofficeSpecialityCommandHandler';
import { BackofficeSearchAllSpecialityQueryHandler } from './application/SearchAll/BackofficeSearchAllSpecialityQueryHandler';
import { BackofficeSearchSpecialityByCriteriaQueryHandler } from './application/SearchByCriteria/BackofficeSearchSpecialitiesByCriteriaQueryHandler';
import { UpdateBackofficeSpecialityCommandHandler } from './application/Update/UpdateBackofficeSpecialityCommandHandler';
import { BackofficeSQLiteSpecialityRepository } from './infrastructure/persistence/BackofficeSQLiteSpecialityRepository';

@Module({
  imports: [CqrsModule],
  providers: [
    BackofficeSQLiteSpecialityRepository,
    CreateBackofficeSpecialityCommandHandler,
    DeleteBackofficeSpecialityCommandHandler,
    DisabledBackofficeSpecialityCommandHandler,
    EnabledBackofficeSpecialityCommandHandler,
    BackofficeSearchAllSpecialityQueryHandler,
    BackofficeSearchSpecialityByCriteriaQueryHandler,
    UpdateBackofficeSpecialityCommandHandler,
  ],
})
export class BackOfficeSpecialityModule {}

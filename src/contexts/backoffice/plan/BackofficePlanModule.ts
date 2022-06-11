import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBackofficePlanCommandHandler } from './application/Create/CreateBackofficePlanCommandHandler';
import { DeleteBackofficePlanCommandHandler } from './application/Delete/DeleteBackofficePlanCommmand';
import { DisabledBackofficePlanCommandHandler } from './application/Disabled/DisabledBackofficePlanCommandHandler';
import { EnabledBackofficePlanCommandHandler } from './application/Enabled/EnabledBackofficePlanCommandHandler';
import { BackofficeSearchAllPlanQueryHandler } from './application/SearchAll/BackofficeSearchAllPlanQueryHandler';
import { BackofficeSearchPlanByCriteriaQueryHandler } from './application/SearchByCriteria/BackofficeSearchPlanByCriteriaQueryHandler';
import { UpdateBackofficePlanCommandHandler } from './application/Update/UpdateBackofficePlanCommandHandler';
import { BackofficeSQLitePlanRepository } from './infrastructure/persistence/BackofficeSQLitePlanRepository';

@Module({
  imports: [CqrsModule],
  providers: [
    BackofficeSQLitePlanRepository,
    CreateBackofficePlanCommandHandler,
    DeleteBackofficePlanCommandHandler,
    DisabledBackofficePlanCommandHandler,
    EnabledBackofficePlanCommandHandler,
    BackofficeSearchAllPlanQueryHandler,
    BackofficeSearchPlanByCriteriaQueryHandler,
    UpdateBackofficePlanCommandHandler,
  ],
})
export class BackofficePlanModule {}

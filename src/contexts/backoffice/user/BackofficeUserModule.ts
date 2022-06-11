import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBackofficeUserCommandHandler } from './application/Create/CreateBackofficeUserCommandHandler';
import { DeleteBackofficeUserCommandHandler } from './application/Delete/DeleteBackofficeUserCommandHandler';
import { DisabledBackofficeUserCommandHandler } from './application/Disabled/DisabledBackofficeUserCommandHandler';
import { EnabledBackofficeUserCommandHandler } from './application/Enabled/EnabledBackofficeUserCommandHandler';
import { BackofficeSearchAllUserQueryHandler } from './application/SearchAll/BackofficeSearchAllUserQueryHandler';
import { BackofficeSearchUserByCriteriaQueryHandler } from './application/SearchByCriteria/BackofficeSearchUserByCriteriaQueryHandler';
import { BackofficeSQLiteUserRepository } from './infrastructure/persistence/BackofficeSQLiteUserRepository';

@Module({
  imports: [CqrsModule],
  providers: [
    BackofficeSQLiteUserRepository,
    CreateBackofficeUserCommandHandler,
    DeleteBackofficeUserCommandHandler,
    DisabledBackofficeUserCommandHandler,
    EnabledBackofficeUserCommandHandler,
    BackofficeSearchAllUserQueryHandler,
    BackofficeSearchUserByCriteriaQueryHandler,
  ],
})
export class BackofficeUserModule {}

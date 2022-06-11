import { Module } from '@nestjs/common';
import { BackofficeAdminModule } from './admin/BackofficeAdminModule';
import { BackofficeMethodModule } from './method/BackofficeMethodModule';
import { BackofficePlanModule } from './plan/BackofficePlanModule';
import { BackofficeSpecialityModule } from './speciality/BackofficeSpecialityModule';
import { BackofficeUserModule } from './user/BackofficeUserModule';
import { BackofficeSQLiteModule } from './shared/infrastructure/persistence/BackofficeSQLiteModule';

@Module({
  imports: [BackofficeSQLiteModule],
  providers: [
    BackofficeAdminModule,
    BackofficeMethodModule,
    BackofficePlanModule,
    BackofficeSpecialityModule,
    BackofficeUserModule,
  ],
  exports: [
    BackofficeAdminModule,
    BackofficeMethodModule,
    BackofficePlanModule,
    BackofficeSpecialityModule,
    BackofficeUserModule,
  ],
})
export class BackofficeModule {}

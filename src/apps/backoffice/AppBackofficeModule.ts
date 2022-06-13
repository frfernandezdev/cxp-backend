import { Module } from '@nestjs/common';
import { BackofficeAdminModule } from 'src/contexts/backoffice/admin/BackofficeAdminModule';
import { BackofficeModule } from 'src/contexts/backoffice/BackofficeModule';
import { BackofficeMethodModule } from 'src/contexts/backoffice/method/BackofficeMethodModule';
import { BackofficePlanModule } from 'src/contexts/backoffice/plan/BackofficePlanModule';
import { BackofficeSpecialityModule } from 'src/contexts/backoffice/speciality/BackofficeSpecialityModule';
import { BackofficeUserModule } from 'src/contexts/backoffice/user/BackofficeUserModule';
import { AppBackofficeAdminModule } from './admin/AppBackofficeAdminModule';
import { AppBackofficeMethodModule } from './method/AppBackofficeMethodModule';
import { AppBackofficePlanModule } from './plan/AppBackofficePlanModule';
import { AppBackofficeSpecialityModule } from './speciality/AppBackofficeSpecialityModule';
import { AppBackofficeUserModule } from './user/AppBackofficeUserModule';

@Module({
  imports: [
    BackofficeModule,
    AppBackofficeAdminModule,
    AppBackofficeMethodModule,
    AppBackofficePlanModule,
    AppBackofficeSpecialityModule,
    AppBackofficeUserModule,
  ],
  providers: [
    BackofficeAdminModule,
    BackofficeMethodModule,
    BackofficePlanModule,
    BackofficeSpecialityModule,
    BackofficeUserModule,
  ],
  exports: [
    AppBackofficeAdminModule,
    AppBackofficeMethodModule,
    AppBackofficePlanModule,
    AppBackofficeSpecialityModule,
    AppBackofficeUserModule,
  ],
})
export class AppBackofficeModule {}

import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/contexts/backoffice/BackofficeModule';
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
  exports: [
    AppBackofficeAdminModule,
    AppBackofficeMethodModule,
    AppBackofficePlanModule,
    AppBackofficeSpecialityModule,
    AppBackofficeUserModule,
  ],
})
export class AppBackofficeModule {}

import { Module } from '@nestjs/common';
import { AppApiModule } from './apps/api/AppApiModule';
import { AppBackofficeModule } from './apps/backoffice/AppBackofficeModule';

@Module({
  imports: [AppApiModule, AppBackofficeModule],
})
export class AppModule {}

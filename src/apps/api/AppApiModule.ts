import { Module } from '@nestjs/common';
import { ApiModule } from 'src/contexts/api/ApiModule';
import { AppApiExpertModule } from './expert/AppApiExpertModule';
import { AppApiMethodModule } from './method/AppApiMethodModule';
import { AppApiPlanModule } from './plan/AppApiPlanModule';
import { AppApiSpecialityModule } from './speciality/AppApiSpecialityModule';

@Module({
  imports: [ApiModule],
  exports: [
    AppApiExpertModule,
    AppApiMethodModule,
    AppApiPlanModule,
    AppApiSpecialityModule,
  ],
})
export class AppApiModule {}

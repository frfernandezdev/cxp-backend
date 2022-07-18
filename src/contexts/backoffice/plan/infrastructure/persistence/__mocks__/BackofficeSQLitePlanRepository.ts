import { MockType } from 'src/contexts/shared/domain/MockType';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Repository } from 'typeorm';

export const BackofficeSQLitePlanRepository: () => MockType<
  Repository<PlanEntity>
> = jest.fn(() => ({}));

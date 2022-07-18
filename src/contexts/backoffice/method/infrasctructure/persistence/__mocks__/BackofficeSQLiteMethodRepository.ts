import { MockType } from 'src/contexts/shared/domain/MockType';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Repository } from 'typeorm';

export const BackofficeSQLiteMethodRepository: () => MockType<
  Repository<MethodEntity>
> = jest.fn(() => ({}));

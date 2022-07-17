import { MockType } from 'src/contexts/shared/domain/MockType';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Repository } from 'typeorm';

export const BackofficeSQLiteAdminRepository: () => MockType<
  Repository<AdminEntity>
> = jest.fn(() => ({}));

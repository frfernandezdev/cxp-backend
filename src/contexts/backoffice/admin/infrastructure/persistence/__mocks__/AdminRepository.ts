import { MockType } from 'src/contexts/shared/domain/MockType';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Repository } from 'typeorm';

export const AdminRepository: () => MockType<Repository<AdminEntity>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    findBy: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    remove: jest.fn((entity) => entity),
  }),
);

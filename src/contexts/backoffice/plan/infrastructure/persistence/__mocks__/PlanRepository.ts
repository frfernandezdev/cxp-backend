import { MockType } from 'src/contexts/shared/domain/MockType';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { Repository } from 'typeorm';

export const PlanRepository: () => MockType<Repository<PlanEntity>> = jest.fn(
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

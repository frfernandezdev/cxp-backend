import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import {
  FilterOperator,
  Operator,
} from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { MockType } from 'src/contexts/shared/domain/MockType';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteriaConverter';
import { Repository } from 'typeorm';
import { BackofficePlan } from '../../../domain/BackofficePlan';
import { BackofficePlanId } from '../../../domain/BackofficePlanId';
import { BackofficePlanIdFixture } from '../../../domain/__fixtures__/BackofficePlanIdFixture';
import { BackofficePlanCoinFixture } from '../../../domain/__fixtures__/BackofficePlanCoinFixture';
import { BackofficePlanDurationFixture } from '../../../domain/__fixtures__/BackofficePlanDurationFixture';
import { BackofficePlanPriceFixture } from '../../../domain/__fixtures__/BackofficePlanPriceFixture';
import { BackofficeSQLitePlanRepository } from '../BackofficeSQLitePlanRepository';
import { PlanRepository } from '../__mocks__/PlanRepository';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficePlanMock = () =>
  new BackofficePlan(
    BackofficePlanIdFixture.random(),
    BackofficePlanPriceFixture.random(),
    BackofficePlanDurationFixture.random(),
    BackofficePlanCoinFixture.random(),
  );

const makePlanEntity = (plan: BackofficePlan): PlanEntity => {
  const entity = new PlanEntity();
  const raw = plan.toPrimitives();

  entity.id = raw.id;
  entity.price = raw.price;
  entity.duration = raw.duration;
  entity.coin = raw.coin;

  return entity;
};

describe('BackofficeSQLitePlanRepository', () => {
  let repository: BackofficeSQLitePlanRepository;
  let repositoryMock: MockType<Repository<PlanEntity>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BackofficeSQLitePlanRepository,
        {
          provide: getRepositoryToken(PlanEntity),
          useFactory: PlanRepository,
        },
      ],
    }).compile();

    repository = moduleRef.get<BackofficeSQLitePlanRepository>(
      BackofficeSQLitePlanRepository,
    );
    repositoryMock = moduleRef.get(getRepositoryToken(PlanEntity));
  });

  describe('#save', () => {
    it('should call to method save', async () => {
      const mockPlan = backofficePlanMock();
      const mockPlanEntity = makePlanEntity(mockPlan);

      repositoryMock.save.mockReturnValue(mockPlanEntity);
      await expect(repository.save(mockPlan)).resolves.toBeUndefined();
      expect(repositoryMock.save).toHaveBeenCalledWith(mockPlanEntity);
    });
  });

  describe('#findById', () => {
    it('should call to method findById', async () => {
      const mockPlan = backofficePlanMock();
      const mockPlanEntity = makePlanEntity(mockPlan);
      const raw = mockPlan.toPrimitives();
      const planId = new BackofficePlanId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockPlanEntity);
      await expect(repository.findById(planId)).resolves.toEqual(mockPlan);
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: planId.value,
      });
    });
  });

  describe('#findOne', () => {
    it('should call to method findOne', async () => {
      const mockPlan = backofficePlanMock();
      const mockPlanEntity = makePlanEntity(mockPlan);
      const raw = mockPlan.toPrimitives();

      const filter = new Filter(
        new FilterField('price'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(String(raw.price)),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);

      repositoryMock.findOne.mockReturnValue(mockPlanEntity);
      await expect(repository.findOne(criteria)).resolves.toEqual(mockPlan);

      const criteriaConverter = new SQLiteCriteriaConverter();
      expect(repositoryMock.findOne).toHaveBeenCalledWith(
        criteriaConverter.convert(criteria),
      );
    });
  });

  describe('#findAll', () => {
    let mockPlanEntities: PlanEntity[];
    const mockPlans: BackofficePlan[] = [];

    beforeEach(() => {
      function load() {
        const mockPlan = backofficePlanMock();

        mockPlans.push(mockPlan);

        return makePlanEntity(mockPlan);
      }

      const emptyArray = Array.from({ length: 3 });
      mockPlanEntities = emptyArray.map(load);
    });

    it('should call to method findAll', async () => {
      repositoryMock.find.mockReturnValue(mockPlanEntities);
      const criteria = new Criteria();
      await expect(repository.findAll(criteria)).resolves.toEqual(mockPlans);

      const criteriaConverter = new SQLiteCriteriaConverter();
      expect(repositoryMock.find).toHaveBeenCalledWith(
        criteriaConverter.convert(criteria),
      );
    });
  });

  describe('#delete', () => {
    it('should call to method delete', async () => {
      const mockPlan = backofficePlanMock();
      const raw = mockPlan.toPrimitives();
      const planId = new BackofficePlanId(raw.id);

      await expect(repository.delete(planId)).resolves.toBeUndefined();
      expect(repositoryMock.delete).toHaveBeenCalledWith({ id: planId.value });
    });
  });

  describe('#remove', () => {
    let mockPlanEntities: PlanEntity[];
    const mockPlans: BackofficePlan[] = [];

    beforeEach(() => {
      function load() {
        const mockPlan = backofficePlanMock();

        mockPlans.push(mockPlan);

        return makePlanEntity(mockPlan);
      }

      const emptyArray = Array.from({ length: 3 });
      mockPlanEntities = emptyArray.map(load);
    });

    it('should call to method remove', async () => {
      const plansId = mockPlans.map(
        (item) => new BackofficePlanId(item.toPrimitives().id),
      );

      repositoryMock.findBy.mockReturnValue(mockPlanEntities);
      await expect(repository.remove(plansId)).resolves.toBeUndefined();

      expect(repositoryMock.findBy).toHaveBeenCalledWith(
        plansId.map(({ value }) => ({ id: value })),
      );

      expect(repositoryMock.remove).toHaveBeenCalledWith(mockPlanEntities);
    });
  });

  describe('disabled', () => {
    it('should call to method disabled', async () => {
      const mockPlan = backofficePlanMock();
      const mockPlanEntity = makePlanEntity(mockPlan);
      const raw = mockPlan.toPrimitives();
      const planId = new BackofficePlanId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockPlanEntity);
      await expect(repository.disabled(planId)).resolves.toBeUndefined();

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: planId.value,
      });

      mockPlanEntity.disabled = true;
      expect(repositoryMock.save).toHaveBeenCalledWith(mockPlanEntity);
    });
  });

  describe('enabled', () => {
    it('should call to method enabled', async () => {
      const mockPlan = backofficePlanMock();
      const mockPlanEntity = makePlanEntity(mockPlan);
      const raw = mockPlan.toPrimitives();
      const planId = new BackofficePlanId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockPlanEntity);
      await expect(repository.disabled(planId)).resolves.toBeUndefined();

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: planId.value,
      });

      mockPlanEntity.disabled = false;
      expect(repositoryMock.save).toHaveBeenCalledWith(mockPlanEntity);
    });
  });
});

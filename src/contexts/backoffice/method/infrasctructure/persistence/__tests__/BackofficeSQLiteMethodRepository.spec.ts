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
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteriaConverter';
import { Repository } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodId } from '../../../domain/BackofficeMethodId';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../BackofficeSQLiteMethodRepository';
import { MethodRepository } from '../__mocks__/MethodRepository';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

const makeMethodEntity = (method: BackofficeMethod): MethodEntity => {
  const entity = new MethodEntity();
  const raw = method.toPrimitives();

  entity.id = raw.id;
  entity.name = raw.name;

  return entity;
};

describe('BackofficeSQLiteMethodRepository', () => {
  let repository: BackofficeSQLiteMethodRepository;
  let repositoryMock: MockType<Repository<MethodEntity>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BackofficeSQLiteMethodRepository,
        {
          provide: getRepositoryToken(MethodEntity),
          useFactory: MethodRepository,
        },
      ],
    }).compile();

    repository = moduleRef.get<BackofficeSQLiteMethodRepository>(
      BackofficeSQLiteMethodRepository,
    );
    repositoryMock = moduleRef.get(getRepositoryToken(MethodEntity));
  });

  describe('#save', () => {
    it('should call to method save', async () => {
      const mockMethod = backofficeMethodMock();
      const mockMethodEntity = makeMethodEntity(mockMethod);

      repositoryMock.save.mockReturnValue(mockMethodEntity);
      await expect(repository.save(mockMethod)).resolves.toBeUndefined();
      expect(repositoryMock.save).toHaveBeenCalledWith(mockMethodEntity);
    });
  });

  describe('#findById', () => {
    it('should call to method findById', async () => {
      const mockMethod = backofficeMethodMock();
      const mockMethodEntity = makeMethodEntity(mockMethod);
      const raw = mockMethod.toPrimitives();
      const methodId = new BackofficeMethodId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockMethodEntity);
      await expect(repository.findById(methodId)).resolves.toEqual(mockMethod);
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: methodId.value,
      });
    });
  });

  describe('#findOne', () => {
    it('should call to method findOne', async () => {
      const mockMethod = backofficeMethodMock();
      const mockMethodEntity = makeMethodEntity(mockMethod);
      const raw = mockMethod.toPrimitives();

      const filter = new Filter(
        new FilterField('name'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(raw.name),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);

      repositoryMock.findOne.mockReturnValue(mockMethodEntity);
      await expect(repository.findOne(criteria)).resolves.toEqual(mockMethod);

      const criteriaConverter = new SQLiteCriteriaConverter();
      expect(repositoryMock.findOne).toHaveBeenCalledWith(
        criteriaConverter.convert(criteria),
      );
    });
  });

  describe('#findAll', () => {
    let mockMethodEntities: MethodEntity[];
    const mockMethods: BackofficeMethod[] = [];

    beforeEach(() => {
      function load() {
        const mockMethod = backofficeMethodMock();

        mockMethods.push(mockMethod);

        return makeMethodEntity(mockMethod);
      }

      const emptyArray = Array.from({ length: 3 });
      mockMethodEntities = emptyArray.map(load);
    });

    it('should call to method findAll', async () => {
      repositoryMock.find.mockReturnValue(mockMethodEntities);
      const criteria = new Criteria();
      await expect(repository.findAll(criteria)).resolves.toEqual(mockMethods);

      const criteriaConverter = new SQLiteCriteriaConverter();
      expect(repositoryMock.find).toHaveBeenCalledWith(
        criteriaConverter.convert(criteria),
      );
    });
  });

  describe('#delete', () => {
    it('should call to method delete', async () => {
      const mockMethod = backofficeMethodMock();
      const raw = mockMethod.toPrimitives();
      const methodId = new BackofficeMethodId(raw.id);

      await expect(repository.delete(methodId)).resolves.toBeUndefined();
      expect(repositoryMock.delete).toHaveBeenCalledWith({
        id: methodId.value,
      });
    });
  });

  describe('#remove', () => {
    let mockMethodEntities: MethodEntity[];
    const mockMethods: BackofficeMethod[] = [];

    beforeEach(() => {
      function load() {
        const mockMethod = backofficeMethodMock();

        mockMethods.push(mockMethod);

        return makeMethodEntity(mockMethod);
      }

      const emptyArray = Array.from({ length: 3 });
      mockMethodEntities = emptyArray.map(load);
    });

    it('should call to method remove', async () => {
      const methodsId = mockMethods.map(
        (item) => new BackofficeMethodId(item.toPrimitives().id),
      );

      repositoryMock.findBy.mockReturnValue(mockMethodEntities);
      await expect(repository.remove(methodsId)).resolves.toBeUndefined();

      expect(repositoryMock.findBy).toHaveBeenCalledWith(
        methodsId.map(({ value }) => ({ id: value })),
      );

      expect(repositoryMock.remove).toHaveBeenCalledWith(mockMethodEntities);
    });
  });

  describe('disabled', () => {
    it('should call to method disabled', async () => {
      const mockMethod = backofficeMethodMock();
      const mockMethodEntity = makeMethodEntity(mockMethod);
      const raw = mockMethod.toPrimitives();
      const methodId = new BackofficeMethodId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockMethodEntity);
      await expect(repository.disabled(methodId)).resolves.toBeUndefined();

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: methodId.value,
      });

      mockMethodEntity.disabled = true;
      expect(repositoryMock.save).toHaveBeenCalledWith(mockMethodEntity);
    });
  });

  describe('enabled', () => {
    it('should call to method enabled', async () => {
      const mockMethod = backofficeMethodMock();
      const mockMethodEntity = makeMethodEntity(mockMethod);
      const raw = mockMethod.toPrimitives();
      const methodId = new BackofficeMethodId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockMethodEntity);
      await expect(repository.disabled(methodId)).resolves.toBeUndefined();

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: methodId.value,
      });

      mockMethodEntity.disabled = false;
      expect(repositoryMock.save).toHaveBeenCalledWith(mockMethodEntity);
    });
  });
});

//import { Test } from '@nestjs/testing';
//import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
//import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
//import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
//import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
//import {
//  FilterOperator,
//  Operator,
//} from 'src/contexts/shared/domain/criteria/FilterOperator';
//import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
//import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
//import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
//import { DataSource, In } from 'typeorm';
//import { BackofficeMethod } from '../../../domain/BackofficeMethod';
//import { BackofficeMethodId } from '../../../domain/BackofficeMethodId';
//import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
//import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
//import { BackofficeSQLiteMethodRepository } from '../BackofficeSQLiteMethodRepository';
//
//jest.mock(
//  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
//);
//
//const backofficeMethodMock = () =>
//  new BackofficeMethod(
//    BackofficeMethodIdFixture.random(),
//    BackofficeMethodNameFixture.random(),
//  );
//
//describe('BackofficeSQLiteMethodRepository', () => {
//  let database: DataSource;
//  let repository: BackofficeSQLiteMethodRepository;
//
//  beforeEach(async () => {
//    const moduleRef = await Test.createTestingModule({
//      imports: [BackofficeSQLiteModule],
//      providers: [BackofficeSQLiteMethodRepository],
//    }).compile();
//
//    database = moduleRef.get<DataSource>(DataSource);
//    repository = moduleRef.get<BackofficeSQLiteMethodRepository>(
//      BackofficeSQLiteMethodRepository,
//    );
//  });
//
//  afterEach(async () => {
//    await database.destroy();
//  });
//
//  describe('#save', () => {
//    it('should create a new method', async () => {
//      const method = backofficeMethodMock();
//      const raw = method.toPrimitives();
//
//      await repository.save(method);
//
//      const entity = await database.manager.findOne(MethodEntity, {
//        where: {
//          id: raw.id,
//        },
//      });
//
//      expect(entity).not.toBeUndefined();
//      expect(raw).toMatchObject({
//        id: entity.id,
//        name: entity.name,
//      });
//    });
//  });
//
//  describe('#findById', () => {
//    let method: MethodEntity;
//
//    beforeEach(async () => {
//      method = new MethodEntity();
//      const { id, name } = backofficeMethodMock().toPrimitives();
//
//      method.id = id;
//      method.name = name;
//
//      await database.manager.save(MethodEntity, method);
//    });
//
//    it('should find a method by id', async () => {
//      const result = await repository.findById(
//        new BackofficeMethodId(method.id),
//      );
//      const raw = result.toPrimitives();
//
//      expect(method).not.toBeUndefined();
//      expect(raw).toMatchObject({
//        id: method.id,
//        name: method.name,
//      });
//    });
//  });
//
//  describe('#findOne', () => {
//    let method: MethodEntity;
//
//    beforeEach(async () => {
//      method = new MethodEntity();
//      const { id, name } = backofficeMethodMock().toPrimitives();
//
//      method.id = id;
//      method.name = name;
//
//      await database.manager.save(MethodEntity, method);
//    });
//
//    it('should find a method by criteria', async () => {
//      const filter = new Filter(
//        new FilterField('name'),
//        FilterOperator.fromValue(Operator.EQUAL),
//        new FilterValue(method.name),
//      );
//      const filters = new Filters([filter]);
//      const criteria = new Criteria(filters);
//      const result = await repository.findOne(criteria);
//      const raw = result.toPrimitives();
//
//      expect(result).not.toBeUndefined();
//      expect(raw).toMatchObject({
//        id: method.id,
//        name: method.name,
//      });
//    });
//  });
//
//  describe('#findALl', () => {
//    const methods: MethodEntity[] = [];
//
//    beforeEach(async () => {
//      for (let i = 0; i < 3; i++) {
//        const item = (methods[i] = new MethodEntity());
//        const { id, name } = backofficeMethodMock().toPrimitives();
//
//        item.id = id;
//        item.name = name;
//
//        await database.manager.save(MethodEntity, item);
//      }
//    });
//
//    it('should find all admin', async () => {
//      const criteria = new Criteria();
//      const result = await repository.findAll(criteria);
//
//      expect(result).toHaveLength(methods.length);
//    });
//  });
//
//  describe('#delete', () => {
//    let method: MethodEntity;
//
//    beforeEach(async () => {
//      method = new MethodEntity();
//      const { id, name } = backofficeMethodMock().toPrimitives();
//
//      method.id = id;
//      method.name = name;
//
//      await database.manager.save(MethodEntity, method);
//    });
//
//    it('should delete a admin', async () => {
//      await repository.delete(method.id);
//
//      const result = await database.manager.findOne(MethodEntity, {
//        where: {
//          id: method.id,
//        },
//      });
//
//      expect(result).toBeUndefined();
//    });
//  });
//
//  describe('#remove', () => {
//    const methods: MethodEntity[] = [];
//
//    beforeEach(async () => {
//      for (let i = 0; i < 3; i++) {
//        const item = (methods[i] = new MethodEntity());
//        const { id, name } = backofficeMethodMock().toPrimitives();
//
//        item.id = id;
//        item.name = name;
//
//        await database.manager.save(MethodEntity, item);
//      }
//    });
//
//    it('should remove method', async () => {
//      const ids = methods.map((item) => item.id);
//      await repository.remove(ids);
//
//      const results = await database.manager.findBy(MethodEntity, {
//        id: In(methods.map((item) => item.id)),
//      });
//
//      expect(results).toHaveLength(0);
//      results.map((item) => expect(methods).not.toContain(item));
//    });
//  });
//
//  describe('#disabled', () => {
//    const methods: MethodEntity[] = [];
//
//    beforeEach(async () => {
//      for (let i = 0; i < 3; i++) {
//        const item = (methods[i] = new MethodEntity());
//        const { id, name } = backofficeMethodMock().toPrimitives();
//
//        item.id = id;
//        item.name = name;
//
//        await database.manager.save(MethodEntity, item);
//      }
//    });
//
//    it('should disabled method', async () => {
//      const ids = methods.map((item) => item.id);
//
//      await repository.disabled(ids);
//
//      const result = await database.manager.findBy(MethodEntity, {
//        id: In(methods.map((item) => item.id)),
//      });
//
//      expect(result).toHaveLength(methods.length);
//      result.map((item) => expect(item.disabled).toBeTruthy());
//    });
//  });
//});

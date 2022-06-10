import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/__mocks__/BackofficeSQLiteModule';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import {
  FilterOperator,
  Operator,
} from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { Connection } from 'typeorm';
import { BackofficeMethod } from '../../../domain/BackofficeMethod';
import { BackofficeMethodId } from '../../../domain/BackofficeMethodId';
import { BackofficeMethodIdFixture } from '../../../domain/__fixtures__/BackofficeMethodIdFixture';
import { BackofficeMethodNameFixture } from '../../../domain/__fixtures__/BackofficeMethodNameFixture';
import { BackofficeSQLiteMethodRepository } from '../BackofficeSQLiteMethodRepository';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeMethodMock = () =>
  new BackofficeMethod(
    BackofficeMethodIdFixture.random(),
    BackofficeMethodNameFixture.random(),
  );

describe('BackofficeSQLiteMethodRepository', () => {
  let database: Connection;
  let repository: BackofficeSQLiteMethodRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteMethodRepository],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    repository = moduleRef.get<BackofficeSQLiteMethodRepository>(
      BackofficeSQLiteMethodRepository,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#save', () => {
    it('should create a new method', async () => {
      const method = backofficeMethodMock();
      const raw = method.toPrimitives();

      await repository.save(method);

      const entity = await database.manager.findOne(MethodEntity, {
        id: raw.id,
      });

      expect(entity).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: entity.id,
        name: entity.name,
      });
    });
  });

  describe('#findById', () => {
    let method: MethodEntity;

    beforeEach(async () => {
      method = new MethodEntity();
      const { id, name } = backofficeMethodMock().toPrimitives();

      method.id = id;
      method.name = name;

      await database.manager.save(MethodEntity, method);
    });

    it('should find a method by id', async () => {
      const result = await repository.findById(
        new BackofficeMethodId(method.id),
      );
      const raw = result.toPrimitives();

      expect(method).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: method.id,
        name: method.name,
      });
    });
  });

  describe('#findOne', () => {
    let method: MethodEntity;

    beforeEach(async () => {
      method = new MethodEntity();
      const { id, name } = backofficeMethodMock().toPrimitives();

      method.id = id;
      method.name = name;

      await database.manager.save(MethodEntity, method);
    });

    it('should find a method by criteria', async () => {
      const filter = new Filter(
        new FilterField('name'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(method.name),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);
      const result = await repository.findOne(criteria);
      const raw = result.toPrimitives();

      expect(result).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: method.id,
        name: method.name,
      });
    });
  });

  describe('#findALl', () => {
    const methods: MethodEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (methods[i] = new MethodEntity());
        const { id, name } = backofficeMethodMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(MethodEntity, item);
      }
    });

    it('should find all admin', async () => {
      const result = await repository.findAll();

      expect(result).toHaveLength(methods.length);
    });
  });

  describe('#delete', () => {
    let method: MethodEntity;

    beforeEach(async () => {
      method = new MethodEntity();
      const { id, name } = backofficeMethodMock().toPrimitives();

      method.id = id;
      method.name = name;

      await database.manager.save(MethodEntity, method);
    });

    it('should delete a admin', async () => {
      await repository.delete(method.id);

      const result = await database.manager.findOne(MethodEntity, {
        id: method.id,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('#remove', () => {
    const methods: MethodEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (methods[i] = new MethodEntity());
        const { id, name } = backofficeMethodMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(MethodEntity, item);
      }
    });

    it('should remove method', async () => {
      const ids = methods.map((item) => item.id);
      await repository.remove(ids);

      const results = await database.manager.findByIds(
        MethodEntity,
        methods.map((item) => item.id),
      );

      expect(results).toHaveLength(0);
      results.map((item) => expect(methods).not.toContain(item));
    });
  });

  describe('#disabled', () => {
    const methods: MethodEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (methods[i] = new MethodEntity());
        const { id, name } = backofficeMethodMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(MethodEntity, item);
      }
    });

    it('should disabled method', async () => {
      const ids = methods.map((item) => item.id);

      await repository.disabled(ids);

      const result = await database.manager.findByIds(
        MethodEntity,
        methods.map((item) => item.id),
      );

      expect(result).toHaveLength(methods.length);
      result.map((item) => expect(item.disabled).toBeTruthy());
    });
  });
});

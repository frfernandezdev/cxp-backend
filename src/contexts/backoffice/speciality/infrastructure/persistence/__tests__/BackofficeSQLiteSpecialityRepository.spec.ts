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
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { Connection } from 'typeorm';
import { BackofficeSpeciality } from '../../../domain/BackofficeSpeciality';
import { BackofficeSpecialityId } from '../../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityIdFixture } from '../../../domain/__fixtures__/BackofficeSpecialityIdFixture';
import { BackofficeSpecialityNameFixture } from '../../../domain/__fixtures__/BackofficeSpecialityNameFixture';
import { BackofficeSQLiteSpecialityRepository } from '../BackofficeSQLiteSpecialityRepository';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeSpecialityMock = () =>
  new BackofficeSpeciality(
    BackofficeSpecialityIdFixture.random(),
    BackofficeSpecialityNameFixture.random(),
  );

describe('BackofficeSQLiteSpecialityRepository', () => {
  let database: Connection;
  let repository: BackofficeSQLiteSpecialityRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteSpecialityRepository],
    }).compile();

    database = moduleRef.get<Connection>(Connection);
    repository = moduleRef.get<BackofficeSQLiteSpecialityRepository>(
      BackofficeSQLiteSpecialityRepository,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#save', () => {
    it('should create a new method', async () => {
      const speciality = backofficeSpecialityMock();
      const raw = speciality.toPrimitives();

      await repository.save(speciality);

      const entity = await database.manager.findOne(SpecialityEntity, {
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
    let speciality: SpecialityEntity;

    beforeEach(async () => {
      speciality = new MethodEntity();
      const { id, name } = backofficeSpecialityMock().toPrimitives();

      speciality.id = id;
      speciality.name = name;

      await database.manager.save(SpecialityEntity, speciality);
    });

    it('should find a speciality by id', async () => {
      const result = await repository.findById(
        new BackofficeSpecialityId(speciality.id),
      );
      const raw = result.toPrimitives();

      expect(speciality).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: speciality.id,
        name: speciality.name,
      });
    });
  });

  describe('#findOne', () => {
    let speciality: SpecialityEntity;

    beforeEach(async () => {
      speciality = new SpecialityEntity();
      const { id, name } = backofficeSpecialityMock().toPrimitives();

      speciality.id = id;
      speciality.name = name;

      await database.manager.save(SpecialityEntity, speciality);
    });

    it('should find a speciality by criteria', async () => {
      const filter = new Filter(
        new FilterField('name'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(speciality.name),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);
      const result = await repository.findOne(criteria);
      const raw = result.toPrimitives();

      expect(result).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: speciality.id,
        name: speciality.name,
      });
    });
  });

  describe('#findALl', () => {
    const specialities: SpecialityEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (specialities[i] = new SpecialityEntity());
        const { id, name } = backofficeSpecialityMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(SpecialityEntity, item);
      }
    });

    it('should find all speciality', async () => {
      const result = await repository.findAll();

      expect(result).toHaveLength(specialities.length);
    });
  });

  describe('#delete', () => {
    let speciality: SpecialityEntity;

    beforeEach(async () => {
      speciality = new SpecialityEntity();
      const { id, name } = backofficeSpecialityMock().toPrimitives();

      speciality.id = id;
      speciality.name = name;

      await database.manager.save(SpecialityEntity, speciality);
    });

    it('should delete a speciality', async () => {
      await repository.delete(speciality.id);

      const result = await database.manager.findOne(SpecialityEntity, {
        id: speciality.id,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('#remove', () => {
    const specialities: SpecialityEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (specialities[i] = new SpecialityEntity());
        const { id, name } = backofficeSpecialityMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(SpecialityEntity, item);
      }
    });

    it('should remove speciality', async () => {
      const ids = specialities.map((item) => item.id);
      await repository.remove(ids);

      const results = await database.manager.findByIds(
        SpecialityEntity,
        specialities.map((item) => item.id),
      );

      expect(results).toHaveLength(0);
      results.map((item) => expect(specialities).not.toContain(item));
    });
  });

  describe('#disabled', () => {
    const specialities: SpecialityEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (specialities[i] = new SpecialityEntity());
        const { id, name } = backofficeSpecialityMock().toPrimitives();

        item.id = id;
        item.name = name;

        await database.manager.save(SpecialityEntity, item);
      }
    });

    it('should disabled speciality', async () => {
      const ids = specialities.map((item) => item.id);

      await repository.disabled(ids);

      const result = await database.manager.findByIds(
        SpecialityEntity,
        specialities.map((item) => item.id),
      );

      expect(result).toHaveLength(specialities.length);
      result.map((item) => expect(item.disabled).toBeTruthy());
    });
  });
});

import { Test } from '@nestjs/testing';
import { BackofficeSQLiteModule } from 'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import {
  FilterOperator,
  Operator,
} from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { DataSource } from 'typeorm';
import { BackofficeAdmin } from '../../../domain/BackofficeAdmin';
import { BackofficeAdminId } from '../../../domain/BackofficeAdminId';
import { BackofficeAdminDisplayNameFixture } from '../../../domain/__fixtures__/BackofficeAdminDisplayNameFixture';
import { BackofficeAdminEmailFixture } from '../../../domain/__fixtures__/BackofficeAdminEmailFixture';
import { BackofficeAdminIdFixture } from '../../../domain/__fixtures__/BackofficeAdminIdFixture';
import { BackofficeAdminLastnameFixture } from '../../../domain/__fixtures__/BackofficeAdminLastnameFixture';
import { BackofficeAdminNameFixture } from '../../../domain/__fixtures__/BackofficeAdminNameFixture';
import { BackofficeAdminPhoneNumberFixture } from '../../../domain/__fixtures__/BackofficeAdminPhoneNumberFixture';
import { BackofficeAdminPhotoURLFixture } from '../../../domain/__fixtures__/BackofficeAdminPhotoURLFixture';
import { BackofficeAdminRoleFixture } from '../../../domain/__fixtures__/BackofficeAdminRoleFixture';
import { BackofficeSQLiteAdminRepository } from '../BackofficeSQLiteAdminRepository';

jest.mock(
  'src/contexts/backoffice/shared/infrastructure/persistence/BackofficeSQLiteModule',
);

const backofficeAdminMock = () =>
  new BackofficeAdmin(
    BackofficeAdminIdFixture.random(),
    BackofficeAdminEmailFixture.random(),
    BackofficeAdminDisplayNameFixture.random(),
    BackofficeAdminPhoneNumberFixture.random(),
    BackofficeAdminPhotoURLFixture.random(),
    BackofficeAdminNameFixture.random(),
    BackofficeAdminLastnameFixture.random(),
    BackofficeAdminRoleFixture.random(),
  );

describe('BackofficeSQLiteAdminRepository', () => {
  let database: DataSource;
  let repository: BackofficeSQLiteAdminRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
      providers: [BackofficeSQLiteAdminRepository],
    }).compile();

    database = moduleRef.get<DataSource>(DataSource);
    repository = moduleRef.get<BackofficeSQLiteAdminRepository>(
      BackofficeSQLiteAdminRepository,
    );
  });

  afterEach(async () => {
    await database.close();
  });

  describe('#save', () => {
    it('should create a new admin', async () => {
      const admin = backofficeAdminMock();
      const raw = admin.toPrimitives();

      await repository.save(admin);

      const entity = await database.manager.findOne(AdminEntity, {
        where: {
          id: raw.id,
        },
      });

      expect(entity).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: entity.id,
        email: entity.email,
        displayName: entity.displayName,
        phoneNumber: entity.phoneNumber,
        photoURL: entity.photoURL,
        name: entity.name,
        lastname: entity.lastname,
        role: +entity.role,
      });
    });
  });

  describe('#findById', () => {
    let admin: AdminEntity;

    beforeEach(async () => {
      admin = new AdminEntity();
      const {
        id,
        email,
        displayName,
        phoneNumber,
        photoURL,
        name,
        lastname,
        role,
      } = backofficeAdminMock().toPrimitives();

      admin.id = id;
      admin.email = email;
      admin.displayName = displayName;
      admin.phoneNumber = phoneNumber;
      admin.photoURL = photoURL;
      admin.name = name;
      admin.lastname = lastname;
      admin.role = role;

      await database.manager.save(AdminEntity, admin);
    });

    it('should find a admin by id', async () => {
      const result = await repository.findById(new BackofficeAdminId(admin.id));
      const raw = result.toPrimitives();

      expect(admin).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: admin.id,
        email: admin.email,
        displayName: admin.displayName,
        phoneNumber: admin.phoneNumber,
        photoURL: admin.photoURL,
        name: admin.name,
        lastname: admin.lastname,
        role: +admin.role,
      });
    });
  });

  describe('#findOne', () => {
    let admin: AdminEntity;

    beforeEach(async () => {
      admin = new AdminEntity();
      const {
        id,
        email,
        displayName,
        phoneNumber,
        photoURL,
        name,
        lastname,
        role,
      } = backofficeAdminMock().toPrimitives();

      admin.id = id;
      admin.email = email;
      admin.displayName = displayName;
      admin.phoneNumber = phoneNumber;
      admin.photoURL = photoURL;
      admin.name = name;
      admin.lastname = lastname;
      admin.role = role;

      await database.manager.save(AdminEntity, admin);
    });

    it('should find a admin by criteria', async () => {
      const filter = new Filter(
        new FilterField('email'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(admin.email),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);
      const result = await repository.findOne(criteria);
      const raw = result.toPrimitives();

      expect(result).not.toBeUndefined();
      expect(raw).toMatchObject({
        id: admin.id,
        email: admin.email,
        displayName: admin.displayName,
        phoneNumber: admin.phoneNumber,
        photoURL: admin.photoURL,
        name: admin.name,
        lastname: admin.lastname,
        role: +admin.role,
      });
    });
  });

  describe('#findAll', () => {
    const admins: AdminEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (admins[i] = new AdminEntity());
        const {
          id,
          email,
          displayName,
          phoneNumber,
          photoURL,
          name,
          lastname,
          role,
        } = backofficeAdminMock().toPrimitives();

        item.id = id;
        item.email = email;
        item.displayName = displayName;
        item.phoneNumber = phoneNumber;
        item.photoURL = photoURL;
        item.name = name;
        item.lastname = lastname;
        item.role = role;

        await database.manager.save(AdminEntity, item);
      }
    });

    it('should find all admin', async () => {
      const result = await repository.findAll();

      expect(result).toHaveLength(admins.length);
    });
  });

  describe('#delete', () => {
    let admin: AdminEntity;

    beforeEach(async () => {
      admin = new AdminEntity();
      const {
        id,
        email,
        displayName,
        phoneNumber,
        photoURL,
        name,
        lastname,
        role,
      } = backofficeAdminMock().toPrimitives();

      admin.id = id;
      admin.email = email;
      admin.displayName = displayName;
      admin.phoneNumber = phoneNumber;
      admin.photoURL = photoURL;
      admin.name = name;
      admin.lastname = lastname;
      admin.role = role;

      await database.manager.save(AdminEntity, admin);
    });

    it('should delete a admin', async () => {
      await repository.delete(admin.id);

      const result = await database.manager.findOne(AdminEntity, {
        where: {
          id: admin.id,
        },
      });

      expect(result).toBeUndefined();
    });
  });

  describe('#remove', () => {
    const admins: AdminEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (admins[i] = new AdminEntity());
        const {
          id,
          email,
          displayName,
          phoneNumber,
          photoURL,
          name,
          lastname,
          role,
        } = backofficeAdminMock().toPrimitives();

        item.id = id;
        item.email = email;
        item.displayName = displayName;
        item.phoneNumber = phoneNumber;
        item.photoURL = photoURL;
        item.name = name;
        item.lastname = lastname;
        item.role = role;

        await database.manager.save(AdminEntity, item);
      }
    });

    it('should remove admins', async () => {
      const ids = admins.map((item) => item.id);
      await repository.remove(ids);

      const results = await database.manager.findByIds(
        AdminEntity,
        admins.map((item) => item.id),
      );

      expect(results).toHaveLength(0);
      results.map((item) => expect(admins).not.toContain(item));
    });
  });

  describe('#disabled', () => {
    const admins: AdminEntity[] = [];

    beforeEach(async () => {
      for (let i = 0; i < 3; i++) {
        const item = (admins[i] = new AdminEntity());
        const {
          id,
          email,
          displayName,
          phoneNumber,
          photoURL,
          name,
          lastname,
          role,
        } = backofficeAdminMock().toPrimitives();

        item.id = id;
        item.email = email;
        item.displayName = displayName;
        item.phoneNumber = phoneNumber;
        item.photoURL = photoURL;
        item.name = name;
        item.lastname = lastname;
        item.role = role;

        await database.manager.save(AdminEntity, item);
      }
    });

    it('should disabled admin', async () => {
      const ids = admins.map((item) => item.id);

      await repository.disabled(ids);

      const result = await database.manager.findByIds(
        AdminEntity,
        admins.map((item) => item.id),
      );

      expect(result).toHaveLength(admins.length);
      result.map((item) => expect(item.disabled).toBeTruthy());
    });
  });
});

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
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteriaConverter';
import { Repository } from 'typeorm';
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
import { AdminRepository } from '../__mocks__/AdminRepository';

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

const makeAdminEntity = (admin: BackofficeAdmin): AdminEntity => {
  const entity = new AdminEntity();
  const raw = admin.toPrimitives();

  entity.id = raw.id;
  entity.email = raw.email;
  entity.displayName = raw.displayName;
  entity.phoneNumber = raw.phoneNumber;
  entity.photoURL = raw.photoURL;
  entity.name = raw.name;
  entity.lastname = raw.lastname;
  entity.role = raw.role;

  return entity;
};

describe('BackofficeSQLiteAdminRepository', () => {
  let repository: BackofficeSQLiteAdminRepository;
  let repositoryMock: MockType<Repository<AdminEntity>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      //imports: [BackofficeSQLiteModule],
      providers: [
        BackofficeSQLiteAdminRepository,
        {
          provide: getRepositoryToken(AdminEntity),
          useFactory: AdminRepository,
        },
      ],
    }).compile();

    repository = moduleRef.get<BackofficeSQLiteAdminRepository>(
      BackofficeSQLiteAdminRepository,
    );
    repositoryMock = moduleRef.get(getRepositoryToken(AdminEntity));
  });

  describe('#save', () => {
    it('should call to method save', async () => {
      const mockAdmin = backofficeAdminMock();
      const mockAdminEntity = makeAdminEntity(mockAdmin);

      repositoryMock.save.mockReturnValue(mockAdminEntity);
      await expect(repository.save(mockAdmin)).resolves.toBeUndefined();
      expect(repositoryMock.save).toHaveBeenCalledWith(mockAdminEntity);
    });
  });

  describe('#findById', () => {
    it('should call to method findById', async () => {
      const mockAdmin = backofficeAdminMock();
      const mockAdminEntity = makeAdminEntity(mockAdmin);
      const raw = mockAdmin.toPrimitives();
      const adminId = new BackofficeAdminId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockAdminEntity);
      await expect(repository.findById(adminId)).resolves.toEqual(mockAdmin);
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: adminId.value,
      });
    });
  });

  describe('#findOne', () => {
    it('should call to method findOne', async () => {
      const mockAdmin = backofficeAdminMock();
      const mockAdminEntity = makeAdminEntity(mockAdmin);
      const raw = mockAdmin.toPrimitives();

      const filter = new Filter(
        new FilterField('email'),
        FilterOperator.fromValue(Operator.EQUAL),
        new FilterValue(raw.email),
      );
      const filters = new Filters([filter]);
      const criteria = new Criteria(filters);

      repositoryMock.findOne.mockReturnValue(mockAdminEntity);
      await expect(repository.findOne(criteria)).resolves.toEqual(mockAdmin);

      const criteriaConverter = new SQLiteCriteriaConverter();
      expect(repositoryMock.findOne).toHaveBeenCalledWith(
        criteriaConverter.convert(criteria),
      );
    });
  });

  describe('#findAll', () => {
    let mockAdminEntities: AdminEntity[];
    const mockAdmins: BackofficeAdmin[] = [];

    beforeEach(() => {
      function load() {
        const mockAdmin = backofficeAdminMock();

        mockAdmins.push(mockAdmin);

        return makeAdminEntity(mockAdmin);
      }

      const emptyArray = Array.from({ length: 3 });
      mockAdminEntities = emptyArray.map(load);
    });

    it('should call to method findAll', async () => {
      repositoryMock.find.mockReturnValue(mockAdminEntities);
      const criteria = new Criteria();
      await expect(repository.findAll(criteria)).resolves.toEqual(mockAdmins);

      const criteriaConverter = new SQLiteCriteriaConverter();
      expect(repositoryMock.find).toHaveBeenCalledWith(
        criteriaConverter.convert(criteria),
      );
    });
  });

  describe('#delete', () => {
    it('should delete a admin', async () => {
      const mockAdmin = backofficeAdminMock();
      const raw = mockAdmin.toPrimitives();
      const adminId = new BackofficeAdminId(raw.id);

      await expect(repository.delete(adminId)).resolves.toBeUndefined();
      expect(repositoryMock.delete).toHaveBeenCalledWith({ id: adminId.value });
    });
  });

  describe('#remove', () => {
    let mockAdminEntities: AdminEntity[];
    const mockAdmins: BackofficeAdmin[] = [];

    beforeEach(() => {
      function load() {
        const mockAdmin = backofficeAdminMock();

        mockAdmins.push(mockAdmin);

        return makeAdminEntity(mockAdmin);
      }

      const emptyArray = Array.from({ length: 3 });
      mockAdminEntities = emptyArray.map(load);
    });

    it('should remove admins', async () => {
      const adminsId = mockAdmins.map(
        (item) => new BackofficeAdminId(item.toPrimitives().id),
      );

      repositoryMock.find.mockReturnValue(mockAdminEntities);
      await expect(repository.remove(adminsId)).resolves.toBeUndefined();

      expect(repositoryMock.find).toHaveBeenCalledWith({
        where: adminsId.map(({ value }) => ({ id: value })),
      });

      expect(repositoryMock.remove).toHaveBeenCalledWith(mockAdminEntities);
    });
  });

  describe('disabled', () => {
    it('should disabled a admin', async () => {
      const mockAdmin = backofficeAdminMock();
      const mockAdminEntity = makeAdminEntity(mockAdmin);
      const raw = mockAdmin.toPrimitives();
      const adminId = new BackofficeAdminId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockAdminEntity);
      await expect(repository.disabled(adminId)).resolves.toBeUndefined();

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: adminId.value,
      });

      mockAdminEntity.disabled = true;
      expect(repositoryMock.save).toHaveBeenCalledWith(mockAdminEntity);
    });
  });

  describe('enabled', () => {
    it('should enabled a admin', async () => {
      const mockAdmin = backofficeAdminMock();
      const mockAdminEntity = makeAdminEntity(mockAdmin);
      const raw = mockAdmin.toPrimitives();
      const adminId = new BackofficeAdminId(raw.id);

      repositoryMock.findOneBy.mockReturnValue(mockAdminEntity);
      await expect(repository.disabled(adminId)).resolves.toBeUndefined();

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
        id: adminId.value,
      });

      mockAdminEntity.disabled = false;
      expect(repositoryMock.save).toHaveBeenCalledWith(mockAdminEntity);
    });
  });
});

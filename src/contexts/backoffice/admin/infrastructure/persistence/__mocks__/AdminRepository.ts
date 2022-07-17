import { MockType } from 'src/contexts/shared/domain/MockType';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { Repository } from 'typeorm';

export const AdminRepository: () => MockType<Repository<AdminEntity>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    remove: jest.fn((entity) => entity),
  }),
);

//it('should create a new admin', async () => {
//  const admin = backofficeAdminMock();
//  const raw = admin.toPrimitives();

//  await repository.save(admin);

//  const entity = await database.manager.findOne(AdminEntity, {
//    where: {
//      id: raw.id,
//    },
//  });

//  expect(entity).not.toBeUndefined();
//  expect(raw).toMatchObject({
//    id: entity.id,
//    email: entity.email,
//    displayName: entity.displayName,
//    phoneNumber: entity.phoneNumber,
//    photoURL: entity.photoURL,
//    name: entity.name,
//    lastname: entity.lastname,
//    role: +entity.role,
//  });
//});

//let admin: AdminEntity;

//beforeEach(async () => {
//  admin = new AdminEntity();
//  const {
//    id,
//    email,
//    displayName,
//    phoneNumber,
//    photoURL,
//    name,
//    lastname,
//    role,
//  } = backofficeAdminMock().toPrimitives();

//  admin.id = id;
//  admin.email = email;
//  admin.displayName = displayName;
//  admin.phoneNumber = phoneNumber;
//  admin.photoURL = photoURL;
//  admin.name = name;
//  admin.lastname = lastname;
//  admin.role = role;

//  await database.manager.save(AdminEntity, admin);
//});

//it('should find a admin by id', async () => {
//  const result = await repository.findById(new BackofficeAdminId(admin.id));
//  const raw = result.toPrimitives();

//  expect(admin).not.toBeUndefined();
//  expect(raw).toMatchObject({
//    id: admin.id,
//    email: admin.email,
//    displayName: admin.displayName,
//    phoneNumber: admin.phoneNumber,
//    photoURL: admin.photoURL,
//    name: admin.name,
//    lastname: admin.lastname,
//    role: +admin.role,
//  });
//});
//let admin: AdminEntity;

//beforeEach(async () => {
//  admin = new AdminEntity();
//  const {
//    id,
//    email,
//    displayName,
//    phoneNumber,
//    photoURL,
//    name,
//    lastname,
//    role,
//  } = backofficeAdminMock().toPrimitives();

//  admin.id = id;
//  admin.email = email;
//  admin.displayName = displayName;
//  admin.phoneNumber = phoneNumber;
//  admin.photoURL = photoURL;
//  admin.name = name;
//  admin.lastname = lastname;
//  admin.role = role;

//  await database.manager.save(AdminEntity, admin);
//});

//it('should find a admin by criteria', async () => {
//  const filter = new Filter(
//    new FilterField('email'),
//    FilterOperator.fromValue(Operator.EQUAL),
//    new FilterValue(admin.email),
//  );
//  const filters = new Filters([filter]);
//  const criteria = new Criteria(filters);
//  const result = await repository.findOne(criteria);
//  const raw = result.toPrimitives();

//  expect(result).not.toBeUndefined();
//  expect(raw).toMatchObject({
//    id: admin.id,
//    email: admin.email,
//    displayName: admin.displayName,
//    phoneNumber: admin.phoneNumber,
//    photoURL: admin.photoURL,
//    name: admin.name,
//    lastname: admin.lastname,
//    role: +admin.role,
//  });
//});
//

//const admins: AdminEntity[] = [];

//beforeEach(async () => {
//  for (let i = 0; i < 3; i++) {
//    const item = (admins[i] = new AdminEntity());
//    const {
//      id,
//      email,
//      displayName,
//      phoneNumber,
//      photoURL,
//      name,
//      lastname,
//      role,
//    } = backofficeAdminMock().toPrimitives();

//    item.id = id;
//    item.email = email;
//    item.displayName = displayName;
//    item.phoneNumber = phoneNumber;
//    item.photoURL = photoURL;
//    item.name = name;
//    item.lastname = lastname;
//    item.role = role;

//    await database.manager.save(AdminEntity, item);
//  }
//});

//it('should find all admin', async () => {
//  const result = await repository.findAll();

//  expect(result).toHaveLength(admins.length);
//});

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteraConverter';
import { Repository } from 'typeorm';
import { BackofficeAdmin } from '../../domain/BackofficeAdmin';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';

@Injectable()
export class BackofficeSQLiteAdminRepository {
  private criteriaConverter: SQLiteCriteriaConverter =
    new SQLiteCriteriaConverter();

  constructor(
    @InjectRepository(AdminEntity)
    private readonly repository: Repository<AdminEntity>,
  ) {}

  async save(admin: BackofficeAdmin): Promise<void> {
    const {
      id,
      email,
      displayName,
      phoneNumber,
      photoURL,
      name,
      lastname,
      role,
    } = admin.toPrimitives();
    const entity = new AdminEntity();

    entity.id = id;
    entity.email = email;
    entity.displayName = displayName;
    entity.phoneNumber = phoneNumber;
    entity.photoURL = photoURL;
    entity.name = name;
    entity.lastname = lastname;
    entity.role = role;

    await this.repository.save(entity);
  }

  async findById(id: BackofficeAdminId): Promise<BackofficeAdmin> {
    const entity = await this.repository.findOne({ id: id.value });

    return BackofficeAdmin.fromPrimitives({
      id: entity.id,
      email: entity.email,
      displayName: entity.displayName,
      phoneNumber: entity.phoneNumber,
      photoURL: entity.photoURL,
      name: entity.name,
      lastname: entity.lastname,
      role: +entity.role,
    });
  }

  async findOne(criteria: Criteria): Promise<BackofficeAdmin> {
    const options = this.criteriaConverter.convert(criteria);
    const entity = await this.repository.findOne(options);

    return BackofficeAdmin.fromPrimitives({
      id: entity.id,
      email: entity.email,
      displayName: entity.displayName,
      phoneNumber: entity.phoneNumber,
      photoURL: entity.photoURL,
      name: entity.name,
      lastname: entity.lastname,
      role: +entity.role,
    });
  }

  async find(criteria: Criteria): Promise<BackofficeAdmin[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficeAdmin.fromPrimitives({
        id: entity.id,
        email: entity.email,
        displayName: entity.displayName,
        phoneNumber: entity.phoneNumber,
        photoURL: entity.photoURL,
        name: entity.name,
        lastname: entity.lastname,
        role: +entity.role,
      }),
    );
  }

  async findAll(): Promise<BackofficeAdmin[]> {
    const entities = await this.repository.find();

    return entities.map((entity) =>
      BackofficeAdmin.fromPrimitives({
        id: entity.id,
        email: entity.email,
        displayName: entity.displayName,
        phoneNumber: entity.phoneNumber,
        photoURL: entity.photoURL,
        name: entity.name,
        lastname: entity.lastname,
        role: +entity.role,
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async remove(ids: string[]): Promise<void> {
    const entities = await this.repository.find({
      where: ids.map((id) => ({ id })),
    });
    await this.repository.remove(entities);
  }

  async disabled(ids: string[]): Promise<void> {
    let entities = await this.repository.find({
      where: ids.map((id) => ({ id })),
    });

    entities = entities.map((item) => {
      item.disabled = true;
      return item;
    });

    await this.repository.save(entities);
  }

  async enabled(ids: string[]): Promise<void> {
    let entities = await this.repository.find({
      where: ids.map((id) => ({ id })),
    });

    entities = entities.map((item) => {
      item.disabled = false;
      return item;
    });

    await this.repository.save(entities);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { SQLiteCriteriaConverter } from 'src/contexts/shared/infrastructure/sqlite/SQLiteCriteraConverter';
import { Repository } from 'typeorm';
import { BackofficeUser } from '../../domain/BackofficeUser';
import { BackofficeUserId } from '../../domain/BackofficeUserId';

@Injectable()
export class BackofficeSQLiteUserRepository {
  private criteriaConverter: SQLiteCriteriaConverter =
    new SQLiteCriteriaConverter();

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: BackofficeUser): Promise<void> {
    const {
      id,
      email,
      displayName,
      phoneNumber,
      photoURL,
      name,
      lastname,
      completeRegister,
      location,
      sessionTaken,
      timezone,
    } = user.toPrimitives();
    const entity = new UserEntity();

    entity.id = id;
    entity.email = email;
    entity.displayName = displayName;
    entity.phoneNumber = phoneNumber;
    entity.photoURL = photoURL;
    entity.name = name;
    entity.lastname = lastname;
    entity.completeRegister = completeRegister;
    entity.location = location;
    entity.sessionTaken = sessionTaken;
    entity.timezone = timezone;

    await this.repository.save(entity);
  }

  async findById(id: BackofficeUserId): Promise<BackofficeUser> {
    const entity = await this.repository.findOne({ id: id.value });

    return BackofficeUser.fromPrimitives({
      id: entity.id,
      email: entity.email,
      displayName: entity.displayName,
      phoneNumber: entity.phoneNumber,
      photoURL: entity.photoURL,
      name: entity.name,
      lastname: entity.lastname,
      completeRegister: entity.completeRegister,
      location: entity.location,
      sessionTaken: entity.sessionTaken,
      timezone: entity.timezone,
    });
  }

  async findOne(criteria: Criteria): Promise<BackofficeUser> {
    const options = this.criteriaConverter.convert(criteria);
    const entity = await this.repository.findOne(options);

    return BackofficeUser.fromPrimitives({
      id: entity.id,
      email: entity.email,
      displayName: entity.displayName,
      phoneNumber: entity.phoneNumber,
      photoURL: entity.photoURL,
      name: entity.name,
      lastname: entity.lastname,
      completeRegister: entity.completeRegister,
      location: entity.location,
      sessionTaken: entity.sessionTaken,
      timezone: entity.timezone,
    });
  }

  async find(criteria: Criteria): Promise<BackofficeUser[]> {
    const options = this.criteriaConverter.convert(criteria);
    const entities = await this.repository.find(options);

    return entities.map((entity) =>
      BackofficeUser.fromPrimitives({
        id: entity.id,
        email: entity.email,
        displayName: entity.displayName,
        phoneNumber: entity.phoneNumber,
        photoURL: entity.photoURL,
        name: entity.name,
        lastname: entity.lastname,
        completeRegister: entity.completeRegister,
        location: entity.location,
        sessionTaken: entity.sessionTaken,
        timezone: entity.timezone,
      }),
    );
  }

  async findAll(): Promise<BackofficeUser[]> {
    const entities = await this.repository.find();

    return entities.map((entity) =>
      BackofficeUser.fromPrimitives({
        id: entity.id,
        email: entity.email,
        displayName: entity.displayName,
        phoneNumber: entity.phoneNumber,
        photoURL: entity.photoURL,
        name: entity.name,
        lastname: entity.lastname,
        completeRegister: entity.completeRegister,
        location: entity.location,
        sessionTaken: entity.sessionTaken,
        timezone: entity.timezone,
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

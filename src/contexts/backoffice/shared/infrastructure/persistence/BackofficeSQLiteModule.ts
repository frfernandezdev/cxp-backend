import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/contexts/shared/infrastructure/entities/AdminEntity';
import { AssociationUserToMethodEntity } from 'src/contexts/shared/infrastructure/entities/AssociationUserToMethodEntity';
import { AssociationUserToSpecialityEntity } from 'src/contexts/shared/infrastructure/entities/AssociationUserToSpecialityEntity';
import { MethodEntity } from 'src/contexts/shared/infrastructure/entities/MethodEntity';
import { PlanEntity } from 'src/contexts/shared/infrastructure/entities/PlanEntity';
import { SpecialityEntity } from 'src/contexts/shared/infrastructure/entities/SpecialityEntity';
import { UserEntity } from 'src/contexts/shared/infrastructure/entities/UserEntity';
import { UserExpertEntity } from 'src/contexts/shared/infrastructure/entities/UserExpertEntity';
import { UserRatingEntity } from 'src/contexts/shared/infrastructure/entities/UserRatingEntity';

const database = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'cxp_db',
  entities: [
    AdminEntity,
    UserEntity,
    UserExpertEntity,
    AssociationUserToSpecialityEntity,
    AssociationUserToMethodEntity,
    UserRatingEntity,
    PlanEntity,
    SpecialityEntity,
    MethodEntity,
  ],
  synchronize: true,
});

const schemas = TypeOrmModule.forFeature([
  AdminEntity,
  UserEntity,
  UserExpertEntity,
  AssociationUserToSpecialityEntity,
  AssociationUserToMethodEntity,
  UserRatingEntity,
  PlanEntity,
  SpecialityEntity,
  MethodEntity,
]);

@Module({
  imports: [database, schemas],
  exports: [database, schemas],
})
export class BackofficeSQLiteModule {}

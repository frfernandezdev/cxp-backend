import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AssociationUserToMethodEntity } from './AssociationUserToMethodEntity';
import { AssociationUserToSpecialityEntity } from './AssociationUserToSpecialityEntity';
import { PlanEntity } from './PlanEntity';
import { SpecialityEntity } from './SpecialityEntity';
import { UserExpertEntity } from './UserExpertEntity';
import { UserRatingEntity } from './UserRatingEntity';

@Entity({
  name: 'cxp_users',
  synchronize: true,
})
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  photoURL: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ default: true })
  disabled: boolean;

  @Column()
  sessionTaken: number;

  @Column()
  completeRegister: boolean;

  @Column()
  timezone: string;

  @Column()
  location: string;

  @OneToOne(() => UserRatingEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  rating: UserRatingEntity;

  @OneToOne(() => UserExpertEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  expert: UserExpertEntity;

  @OneToMany(
    () => AssociationUserToSpecialityEntity,
    (assocSpeciality) => assocSpeciality.speciality,
    { onDelete: 'CASCADE' },
  )
  specialities: SpecialityEntity[];

  @OneToMany(
    () => AssociationUserToMethodEntity,
    (assocMethod) => assocMethod,
    { onDelete: 'CASCADE' },
  )
  methods: AssociationUserToMethodEntity[];

  @OneToMany(() => PlanEntity, (plan) => plan.id, { onDelete: 'CASCADE' })
  plans: PlanEntity[];
}

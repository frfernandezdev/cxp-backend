import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MethodEntity } from './MethodEntity';
import { UserEntity } from './UserEntity';

@Entity({
  name: 'cxp_association_user_to_method',
  synchronize: true,
})
export class AssociationUserToMethodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => MethodEntity, (method) => method.id)
  method: MethodEntity;

  @Column()
  link: string;

  @Column({ default: false })
  disabled: boolean;
}

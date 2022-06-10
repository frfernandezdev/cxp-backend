import { BackofficeAdminRoles } from 'src/contexts/backoffice/admins/domain/BackofficeAdminRole';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'cxp_admins',
  synchronize: true,
})
export class AdminEntity {
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

  @Column({ default: false })
  disabled: boolean;

  @Column({ type: 'simple-enum' })
  role: BackofficeAdminRoles;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'cxp_speciality',
  synchronize: true,
})
export class SpecialityEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  disabled: boolean;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'cxp_method',
  synchronize: true,
})
export class MethodEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  disabled: boolean;
}

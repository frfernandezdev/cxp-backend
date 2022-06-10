import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'cxp_plan',
  synchronize: true,
})
export class PlanEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  coin: string;

  @Column({ default: true })
  disabled: boolean;
}

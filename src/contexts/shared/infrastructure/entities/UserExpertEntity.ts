import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'cxp_user_expert',
  synchronize: true,
})
export class UserExpertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  headline: string;

  @Column()
  abouteMe: string;

  @Column()
  linkVideo: string;
}

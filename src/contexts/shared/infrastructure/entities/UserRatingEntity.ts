import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'cxp_user_rating',
  synchronize: true,
})
export class UserRatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  average: number;

  @Column('simple-array')
  stars: number[];

  @Column()
  votes: number;
}

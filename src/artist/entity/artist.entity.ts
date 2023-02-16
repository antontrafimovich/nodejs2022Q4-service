import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}

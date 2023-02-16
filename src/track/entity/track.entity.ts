import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @Column()
  duration: number;
}

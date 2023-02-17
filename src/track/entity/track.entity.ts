import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from '../../album/entity/album.entity';
import { ArtistEntity } from '../../artist/entity/artist.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => AlbumEntity, undefined, {
    cascade: ['remove'],
    onDelete: 'SET NULL',
  })
  albumId: string;

  @Column({ type: 'uuid', nullable: true })
  @ManyToOne(() => ArtistEntity, undefined, {
    cascade: ['remove'],
    onDelete: 'SET NULL',
  })
  artistId: string;

  @Column()
  duration: number;
}

import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AlbumEntity } from '../../album/entity/album.entity';
import { ArtistEntity } from '../../artist/entity/artist.entity';
import { TrackFavoriteEntity } from '../../favorites/entity/track-favorite.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @Column()
  duration: number;

  @OneToOne(() => TrackFavoriteEntity, (trackFavorite) => trackFavorite.track, {
    orphanedRowAction: 'delete',
  })
  favorite: TrackFavoriteEntity;
}

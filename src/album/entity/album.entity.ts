import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArtistEntity } from '../../artist/entity/artist.entity';
import { AlbumFavoriteEntity } from '../../favorites/entity/album-favorite.entity';
import { TrackEntity } from '../../track/entity/track.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album, {
    orphanedRowAction: 'delete',
  })
  tracks: TrackEntity[];

  @OneToOne(() => AlbumFavoriteEntity, (albumFavorite) => albumFavorite.album, {
    orphanedRowAction: 'delete',
  })
  favorite: AlbumFavoriteEntity;
}

import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AlbumEntity } from '../../album/entity/album.entity';
import { ArtistFavoriteEntity } from '../../favorites/entity/artist-favorite.entity';
import { TrackEntity } from '../../track/entity/track.entity';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist, {
    orphanedRowAction: 'delete',
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist, {
    orphanedRowAction: 'delete',
  })
  tracks: TrackEntity[];

  @OneToOne(
    () => ArtistFavoriteEntity,
    (aritstFavorite) => aritstFavorite.artist,
    { orphanedRowAction: 'delete' },
  )
  favorite: ArtistFavoriteEntity;
}

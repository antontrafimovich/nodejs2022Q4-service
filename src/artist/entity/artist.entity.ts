import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from '../../album/entity/album.entity';

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
}

import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from '../../album/entity/album.entity';

@Entity()
export class AlbumFavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => AlbumEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  album: AlbumEntity;
}

import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from '../../artist/entity/artist.entity';

@Entity()
export class ArtistFavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ArtistEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  artist: ArtistEntity;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum FavoriteEntityType {
  artist = 'artist',
  album = 'album',
  track = 'track',
}

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: 'artist' | 'album' | 'track';

  @Column('uuid')
  entityId: string;
}

import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TrackEntity } from '../../track/entity/track.entity';

@Entity()
export class TrackFavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TrackEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  track: TrackEntity;
}

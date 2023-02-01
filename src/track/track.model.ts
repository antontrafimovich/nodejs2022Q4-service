import { Track } from '../model';

export type CreateTrackDTO = Omit<Track, 'id'>;

export type UpdateTrackDTO = Omit<Track, 'id'>;

import { Artist } from '../model';

export type CreateArtistDTO = Omit<Artist, 'id'>;

export type UpdateArtistDTO = Omit<Artist, 'id'>;

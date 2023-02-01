import { Album } from '../model';

export type CreateAlbumDTO = Omit<Album, 'id'>;

export type UpdateAlbumDTO = Omit<Album, 'id'>;

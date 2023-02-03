import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  artistId: string | null; // refers to Artist
}

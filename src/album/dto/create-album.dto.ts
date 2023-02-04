import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist
}

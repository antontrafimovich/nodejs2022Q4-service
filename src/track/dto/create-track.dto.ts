import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null; // refers to Artist

  @ValidateIf((o) => o.albumId !== null)
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  duration: number; // integer number
}

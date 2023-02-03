import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  duration: number; // integer number
}

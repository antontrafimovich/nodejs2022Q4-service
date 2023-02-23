import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

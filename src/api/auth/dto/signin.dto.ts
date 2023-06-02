import { IsNotEmpty, Length } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}

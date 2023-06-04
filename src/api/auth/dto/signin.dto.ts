import { IsNotEmpty, IsDefined } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  username: string;

  @IsDefined()
  password: string;
}

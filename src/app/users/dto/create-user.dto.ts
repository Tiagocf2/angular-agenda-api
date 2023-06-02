import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  address: string;
}

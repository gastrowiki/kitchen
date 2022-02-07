import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public password_verification: string;

  @IsString()
  public givenName: string;

  @IsString()
  public familyName: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

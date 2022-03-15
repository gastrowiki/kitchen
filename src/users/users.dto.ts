import { IsEmail, IsString, MinLength, IsNotEmpty, Matches } from 'class-validator';
import { IsEqualTo } from 'common/utils/validators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter a username' })
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  public username: string;

  @IsEmail({ message: 'Please enter a valid email' })
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;

  @IsEqualTo('password', { message: 'Passwords must match' })
  public password_verification: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your first name' })
  public givenName: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your last name' })
  public familyName: string;
}

export class LoginUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}
export class UsernameAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  public username: string;
}

export class ForgotPasswordDto {
  @IsEmail({ message: 'Please enter a valid email' })
  public email: string;
}

export class ResetPasswordDto {
  @IsEmail({ message: 'Please enter a valid email' })
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;

  @IsEqualTo('password', { message: 'Passwords must match' })
  public password_verification: string;

  @IsString()
  public token: string;
}

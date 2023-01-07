import { IsDefined, IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsDefined()
  username: string;

  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  @IsString()
  @IsDefined()
  @Length(4)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password too weak',
  // })
  password: string;
}

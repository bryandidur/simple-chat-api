import { IsEmail, Length } from 'class-validator';
import { CreateUser } from '../user.interface';

export class CreateUserDto implements CreateUser {
  @Length(2, 100)
  firstName: string;

  @Length(2, 100)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(2, 100)
  password: string;
}

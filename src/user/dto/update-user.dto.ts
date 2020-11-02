import { IsEmail, IsOptional, Length } from 'class-validator';
import { UpdateUser } from '../user.interface';

export class UpdateUserDto implements UpdateUser {
  @Length(2, 100)
  firstName: string;

  @Length(2, 100)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(2, 100)
  @IsOptional()
  password?: string;
}

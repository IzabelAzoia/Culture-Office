import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  yearOfBirth: number;

  @IsNotEmpty()
  @IsNumber()
  birthYear: number;
}

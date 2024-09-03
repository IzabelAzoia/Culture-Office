import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsArray,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  course?: string[];

  @IsString()
  @IsNotEmpty()
  subject: string;
}

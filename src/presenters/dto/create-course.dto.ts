import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsDate,
  IsIn,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsPositive()
  duration: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsString()
  @IsNotEmpty()
  instructorId: string;

  @IsOptional()
  @IsPositive()
  seatsAvailable?: number;

  @IsOptional()
  @IsString({ each: true })
  prerequisites?: string[];

  @IsIn(['online', 'in-person', 'hybrid'])
  type: string;

  @IsOptional()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString({ each: true })
  teachers?: string[];
}

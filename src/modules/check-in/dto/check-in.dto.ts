import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCheckInDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsDate()
  timeIn: Date;

  @IsDate()
  timeOut?: Date;
}

export class UpdateCheckInDto extends PartialType(CreateCheckInDto) {}

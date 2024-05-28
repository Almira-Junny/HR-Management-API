import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCheckInDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  employeeId: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  timeIn: string;

  @IsDateString()
  @ApiProperty()
  timeOut?: string;
}

export class UpdateCheckInDto extends PartialType(CreateCheckInDto) {}

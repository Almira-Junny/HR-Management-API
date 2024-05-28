import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  receiverId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  sendDate: string;
}

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}

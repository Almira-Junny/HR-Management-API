import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  scheduleId: number;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}

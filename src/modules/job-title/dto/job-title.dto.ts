import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJobTitleDto {
  @ApiProperty({
    example: 'Software Engineer',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Develop software applications',
  })
  @IsString()
  responsibilities: string;
}

export class UpdateJobTitleDto extends PartialType(CreateJobTitleDto) {}

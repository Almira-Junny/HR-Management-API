import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { GenderEnum } from 'src/enums';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'Hoàng Đăng',
  })
  @IsString()
  @Length(5, 50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'thanhoangdang@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  @Length(8, 50)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  @Length(8, 50)
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({
    example: '0987654321',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'male',
  })
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: 'Hà Nội',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '2001-11-4',
  })
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    example: '2024-4-1',
  })
  @IsString()
  @IsNotEmpty()
  onJobDate: string;

  @ApiProperty({
    example: '2',
  })
  @IsNumber()
  @IsNotEmpty()
  jobTitleId: number;

  @ApiProperty({
    example: '2',
  })
  @IsNumber()
  @IsNotEmpty()
  departmentId: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

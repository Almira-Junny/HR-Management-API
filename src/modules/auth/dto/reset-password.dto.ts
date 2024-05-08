import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'token',
  })
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "123456789"
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "123456789"
  })
  passwordConfirm: string;
}

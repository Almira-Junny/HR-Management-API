import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @ApiProperty({
    example: '12345678',
  })
  currentPassword: string;

  @IsString()
  @ApiProperty({
    example: '123456789',
  })
  newPassword: string;

  @IsString()
  @ApiProperty({
    example: '123456789',
  })
  confirmPassword: string;
}

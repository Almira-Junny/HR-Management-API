import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'thanhoangdang@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '12345678',
  })
  password: string;
}

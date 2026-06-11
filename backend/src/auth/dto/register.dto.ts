import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Harini' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'harini@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @MinLength(8)
  password: string;
}

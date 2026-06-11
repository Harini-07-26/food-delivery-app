import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Harini Patel' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'harini@example.com' })
  @IsEmail()
  email: string;
}

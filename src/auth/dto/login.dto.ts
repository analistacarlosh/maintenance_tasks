import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  password: string;
}

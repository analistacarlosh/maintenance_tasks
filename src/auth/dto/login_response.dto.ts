import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(250)
  access_token: string;
}

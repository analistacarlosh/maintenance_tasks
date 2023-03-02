import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { User } from '../../user/entity/user.entity';

export class TaskResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(2500)
  summary: string;

  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

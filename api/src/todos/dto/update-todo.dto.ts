import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(5, 30)
  @ApiProperty({ example: '🛒 Grocery Shopping', required: false })
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(5, 140)
  @ApiProperty({
    example: 'Buy bananas 🍌, apples 🍎, and oranges 🍊',
    required: false,
  })
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, required: false })
  isCompleted: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    examples: ['2021-01-01', '2021-01-01T00:00:00.000Z'],
    required: false,
  })
  @Transform(({ value }) => value.toISOString())
  due: string;
}

import { Transform } from 'class-transformer';
import {
  IsBoolean,
  Length,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString()
  @Length(5, 60)
  @ApiProperty({ example: '🛒 Grocery Shopping', required: true })
  title: string;

  @IsString()
  @IsOptional()
  @Length(5, 140)
  @ApiProperty({
    example: 'Buy bananas 🍌, apples 🍎, and oranges 🍊',
    required: false,
  })
  body: string | undefined;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, required: false, default: false })
  isCompleted: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    examples: ['2021-01-01', '2021-01-01T00:00:00.000Z'],
    required: false,
    default: new Date().toISOString(),
  })
  due: string = new Date().toISOString();
}

export class ITodoApiResponse extends CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '60e8c9c0e4b0e8b9c0e4b0e8' })
  id: string;

  @ApiProperty({ required: true })
  isCompleted: boolean;

  @ApiProperty({ required: true })
  due: string;

  @IsDateString()
  @ApiProperty({ examples: ['2021-01-01', '2021-01-01T00:00:00.000Z'] })
  createdAt: string;

  @IsDateString()
  @ApiProperty({ examples: ['2021-01-01', '2021-01-01T00:00:00.000Z'] })
  updatedAt: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: string; // ISO string: e.g., '2025-06-01'

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  time: string; // e.g., '14:00'

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
}

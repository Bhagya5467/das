import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GENDER } from '../../common/enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPatientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsEnum(GENDER)
  @IsNotEmpty()
  readonly gender: GENDER;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly phoneNo?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly age: number;
}

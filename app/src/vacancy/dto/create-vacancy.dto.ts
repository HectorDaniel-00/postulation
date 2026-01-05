import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  seniority: string;

  @IsNotEmpty()
  @IsString()
  softKills: string;

  @IsNotEmpty()
  @IsString()
  tecnologies: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  modality: string;

  @IsNotEmpty()
  @IsNumber()
  salaryRange: number;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsNumber()
  maxApplicants: number;
}

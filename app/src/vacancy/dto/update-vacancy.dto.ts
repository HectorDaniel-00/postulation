import { PartialType } from '@nestjs/swagger';
import { CreateVacancyDto } from './create-vacancy.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateVacancyDto extends PartialType(CreateVacancyDto) {
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

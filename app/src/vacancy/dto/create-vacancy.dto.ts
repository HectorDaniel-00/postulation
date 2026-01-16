import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVacancyDto {
  @ApiProperty({
    description: 'Título de la vacante',
    example: 'Desarrollador Backend',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción de la vacante',
    example: 'Responsable de desarrollar APIs RESTful.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Nivel de experiencia requerido',
    example: 'Senior',
  })
  @IsNotEmpty()
  @IsString()
  seniority: string;

  @ApiProperty({
    description: 'Habilidades blandas requeridas',
    example: 'Trabajo en equipo, comunicación',
  })
  @IsNotEmpty()
  @IsString()
  softSkills: string;

  @ApiProperty({
    description: 'Tecnologías requeridas',
    example: 'Node.js, TypeScript',
  })
  @IsNotEmpty()
  @IsString()
  tecnologies: string;

  @ApiProperty({ description: 'Ubicación del trabajo', example: 'Remoto' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Modalidad de trabajo',
    example: 'Tiempo completo',
  })
  @IsNotEmpty()
  @IsString()
  modality: string;

  @ApiProperty({ description: 'Rango salarial', example: 50000 })
  @IsNotEmpty()
  @IsNumber()
  salaryRange: number;

  @ApiProperty({ description: 'Nombre de la empresa', example: 'TechCorp' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ description: 'Número máximo de postulantes', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  maxApplicants: number;
}

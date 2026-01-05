import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: 'ID del usuario que aplica', example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'ID de la vacante a la que se aplica',
    example: 10,
  })
  @IsNumber()
  vacancyId: number;
}

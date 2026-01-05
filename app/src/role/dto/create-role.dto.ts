import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateRoleDto {
  @ApiProperty({ description: 'Nombre del rol', example: 'Administrador' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

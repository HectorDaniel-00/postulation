import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@example.com',
  })
  @IsString({
    message: 'The email address must be a string with at least @.com',
  })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  email!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString({ message: 'The password address must be a string' })
  @MinLength(8, {
    message: 'The password must be at least 8 valid characters.',
  })
  @IsNotEmpty({ message: 'The password cannot be empty.' })
  password!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nombre completo del usuario',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Correo electrónico del usuario',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 15, { message: 'Password must be between 6 and 15 characters' })
  password: string;
}

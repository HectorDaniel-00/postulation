import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message, Roles } from 'src/common/decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Message('Usuario creado con exito')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateUserDto) {
    const user = this.service.create(dto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario encontrado con exito')
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @Get()
  @Roles('ADMIN', 'Gestor')
  findAll() {
    const user = this.service.findAll();
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario encontrado con exito')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del usuario.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  @Roles('ADMIN', 'Gestor', 'USER')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.service.findOne(id);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario actualizado con exito')
  @Patch(':id')
  @Roles('ADMIN', 'Gestor', 'USER')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = this.service.update(id, updateUserDto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario eliminado con exito')
  @Delete(':id')
  @Roles('ADMIN', 'Gestor')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.service.remove(+id);
  }
}

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

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Message('Usuario creado con exito')
  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateUserDto) {
    const user = this.service.create(dto);
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario encontrado con exito')
  @Get()
  @Roles('ADMIN', 'Gestor')
  findAll() {
    const user = this.service.findAll();
    return plainToInstance(ResponseUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Message('Usuario encontrado con exito')
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

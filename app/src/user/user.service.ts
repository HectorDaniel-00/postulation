import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './entities/user.repository';
import * as bcrypt from 'bcrypt';

import { RoleService } from 'src/role/role.service';
import { Role } from 'src/common/enum';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly salRound = 10;
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.userRepo.findOneByEmail(data.email);
    if (user) {
      this.logger.error(`Error el usuario con el email ${user.email}`);
      throw new ConflictException(
        `El email ${user.email} ya existe, por favor ingresar uno diferente`,
      );
    }

    const salt = await bcrypt.genSalt(this.salRound);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const resultRol = data.rol ?? Role.GESTOR;
    const role = await this.roleService.findByName(resultRol);

    const newUser = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role,
    };
    const createdUser = await this.userRepo.create(newUser);
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role.name,
    };
  }

  async findAll() {
    const user = await this.userRepo.findAll();
    if (user.length <= 0) {
      throw new NotFoundException('Lista de usuarios vacia');
    }
    return user.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
    }));
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido esta incompleto o incorrecto',
      );
    }

    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `Error el usuario con el id ${id} no existe, vuelva a intentarlo con otro id`,
      );
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
    };
  }

  async update(id: number, data: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException(
        'El campo requerido (id) esta incompleto, por favor verifique e intente nuevamente',
      );
    }
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id ${id} no existe, por favor cambie el dato ingresado y vuelta a intentarlo`,
      );
    }
    const updateUser = {
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      role: user.role,
    };
    const modifyUser = await this.userRepo.update(id, updateUser);
    return {
      id: modifyUser?.id,
      name: modifyUser?.name,
      email: modifyUser?.email,
      role: modifyUser?.role.name,
    };
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Campo requerido esta vacio');
    }
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(
        `El usuario con el id ${id} no existe, cambia el valor y vuelve a intentarlo`,
      );
    }
    return user;
  }
}

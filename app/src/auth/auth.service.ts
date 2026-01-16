import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthPayloadDto, AuthRegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/entities/user.repository';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserRepository,
    private readonly roleService: RoleService,
    private jwt: JwtService,
  ) {}

  async register(data: AuthRegisterDto) {
    const salRonund = await bcrypt.genSalt();
    const hasPassword = await bcrypt.hash(data.password, salRonund);
    const role = await this.roleService.findByName('USER');

    const newUser = {
      name: data.name,
      email: data.email,
      password: hasPassword,
      role,
    };
    return await this.userService.create(newUser);
  }

  async login(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'invalid credentials in email or password',
      );
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new UnauthorizedException(
        'invalid credentials in email or password',
      );
    }
    const payload: AuthPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role.id,
    };

    const token = await this.jwt.signAsync(payload);
    return token;
  }
}

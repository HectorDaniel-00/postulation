// src/seed/seeders/user.seeder.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../user/entities/user.entity';
import { RoleEntity } from '../../../role/entities/role.entity';
import usersData from '../data/users.json';
import { Logger } from '@nestjs/common';
// import * as bcrypt from 'bcrypt'; // descomentar si usas hash

export async function seedUsers(dataSource: DataSource, roles: RoleEntity[]) {
  const logger = new Logger(seedUsers.name);
  const repo = dataSource.getRepository(UserEntity);

  const count = await repo.count();
  if (count > 0) {
    logger.log('  Usuarios ya existen, saltando...');
    const existingUsers = await repo.find({ relations: ['role'] });
    return existingUsers;
  }

  // Mapear usuarios con sus roles
  const usersWithRole = usersData.map((user) => ({
    name: user.name,
    email: user.email,
    password: user.password, // En producción: await bcrypt.hash(user.password, 10)
    role: roles[user.role_id],
  }));

  const users = await repo.save(usersWithRole);
  logger.log(` ${users.length} usuarios insertados`);
  return users;
}

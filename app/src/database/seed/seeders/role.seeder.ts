// src/seed/seeders/role.seeder.ts
import { DataSource } from 'typeorm';
import rolesData from '../data/role.json';
import { Logger } from '@nestjs/common';
import { RoleEntity } from 'src/role/entities/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const logger = new Logger(seedRoles.name);
  const repo = dataSource.getRepository(RoleEntity);

  const count = await repo.count();
  if (count > 0) {
    logger.log('  Roles ya existen, saltando...');
    const existingRoles = await repo.find();
    return existingRoles;
  }

  const roles = await repo.save(rolesData);
  logger.log(` ${roles.length} roles insertados`);
  return roles;
}

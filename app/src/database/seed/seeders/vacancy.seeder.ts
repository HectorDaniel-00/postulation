// src/seed/seeders/vacancy.seeder.ts
import { DataSource } from 'typeorm';
import { VacancyEntity } from '../../../vacancy/entities/vacancy.entity';
import vacanciesData from '../data/vacancy.json';
import { Logger } from '@nestjs/common';

export async function seedVacancies(dataSource: DataSource) {
  const logger = new Logger(seedVacancies.name);
  const repo = dataSource.getRepository(VacancyEntity);

  const count = await repo.count();
  if (count > 0) {
    logger.log('  Vacantes ya existen, saltando...');
    const existingVacancies = await repo.find();
    return existingVacancies;
  }

  const vacancies = await repo.save(vacanciesData);
  logger.log(` ${vacancies.length} vacantes insertadas`);
  return vacancies;
}

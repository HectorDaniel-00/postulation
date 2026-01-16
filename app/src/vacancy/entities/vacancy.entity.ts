import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacancies')
export class VacancyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: false })
  seniority: string;

  @Column({ name: 'soft_skills', nullable: false })
  softSkills: string;

  @Column({ nullable: false })
  tecnologies: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  modality: string;

  @Column({ name: 'salary_range', nullable: false })
  salaryRange: number;

  @Column({ nullable: false })
  company: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'max_applicants', nullable: false })
  maxApplicants: number;
}

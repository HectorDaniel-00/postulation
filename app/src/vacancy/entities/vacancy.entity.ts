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

  @Column({ nullable: false })
  softKills: string;

  @Column({ nullable: false })
  tecnologies: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  modality: string;

  @Column({ nullable: false })
  salaryRange: number;

  @Column({ nullable: false })
  company: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ nullable: false })
  maxApplicants: number;
}

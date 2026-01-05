import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tecnologies')
export class TecnologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ default: 'Sin descripcion' })
  description: string;
}

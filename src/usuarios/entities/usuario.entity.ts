import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Certificado } from '../../certificados/entities/certificado.entity';

@Entity('USUARIOS')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO' })
  id: number;

  @Column({ name: 'DS_EMAIL', nullable: true })
  email: string;

  @Column({ name: 'DS_SENHA', nullable: true })
  senha: string;

  @OneToMany(() => Certificado, (certificado) => certificado.usuario)
  certificados: Certificado[];
}

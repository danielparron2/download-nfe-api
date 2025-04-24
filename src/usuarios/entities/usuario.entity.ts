import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('USUARIOS')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'ID_USUARIO' })
  id: number;

  @Column({ name: 'DS_EMAIL', nullable: true })
  email: string;

  @Column({ name: 'DS_SENHA', nullable: true })
  senha: string;

  @Column({ name: 'NM_USUARIO', nullable: true })
  name: string;

//  @OneToMany(() => Certificado, (certificado) => certificado.usuario)
//  certificados: Certificado[];
//  @OneToMany(() => Certificado, (certificado) => certificado.usuario, { cascade: true })
//  @ApiProperty({ type: () => Certificado })
//  certificados: Certificado[];
}
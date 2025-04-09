import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('CERTFICADOS_DIGITAIS')
export class Certificado {
  @PrimaryColumn({ name: 'ID_USUARIO' })
  usuarioId: number;

  @PrimaryColumn({ name: 'ID_CERTIFICADO' })
  certificadoId: number;

  @Column({ name: 'NR_CNPJ', nullable: true })
  cnpj: string;

  @Column({ name: 'DS_APELIDO_CERTIFICADO', nullable: true })
  apelido: string;

  @Column({ name: 'BLB_CERTIFICADO', type: 'blob', nullable: true })
  certificado: Buffer;

  @Column({ name: 'DS_SENHA_CERTIFICADO', nullable: true })
  senhaCertificado: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.certificados)
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario: Usuario;
}
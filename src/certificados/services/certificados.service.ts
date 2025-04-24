import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificado } from '../entities/certificado.entity';

@Injectable()
export class CertificadosService {
  constructor(
    @InjectRepository(Certificado)
    private readonly certificadoRepository: Repository<Certificado>,
  ) {}

  findAll(): Promise<Certificado[]> {
    return this.certificadoRepository.find();
  }

  findOne(usuarioId: number, certificadoId: number): Promise<Certificado | null> {
    return this.certificadoRepository.findOne({
      where: {
        usuarioId,
        certificadoId,
      },
    });
  }

  create(certificado: Certificado): Promise<Certificado> {
    return this.certificadoRepository.save(certificado);
  }

  update(usuarioId: number, certificadoId: number, certificado: Certificado): Promise<any> {
    return this.certificadoRepository.update({ usuarioId, certificadoId }, certificado);
  }

  delete(usuarioId: number, certificadoId: number): Promise<any> {
    return this.certificadoRepository.delete({ usuarioId, certificadoId });
  }
}

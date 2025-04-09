import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';
import { CertificadosService } from '../certificados/services/certificados.service';
import { CertificadosController } from '../certificados/controllers/certificados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Certificado])],
  providers: [CertificadosService],
  controllers: [CertificadosController],
})
export class CertificadosModule {}

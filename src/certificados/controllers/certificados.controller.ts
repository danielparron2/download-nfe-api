import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CertificadosService } from '../services/certificados.service';
import { Certificado } from '../entities/certificado.entity';

@Controller('certificados')
export class CertificadosController {
  constructor(private readonly certificadosService: CertificadosService) {}

  @Get()
  findAll() {
    return this.certificadosService.findAll();
  }

  @Get(':usuarioId/:certificadoId')
  findOne(@Param('usuarioId') usuarioId: number, @Param('certificadoId') certificadoId: number) {
    return this.certificadosService.findOne(usuarioId, certificadoId);
  }

  @Post()
  create(@Body() certificado: Certificado) {
    return this.certificadosService.create(certificado);
  }

  @Put(':usuarioId/:certificadoId')
  update(
    @Param('usuarioId') usuarioId: number,
    @Param('certificadoId') certificadoId: number,
    @Body() certificado: Certificado,
  ) {
    return this.certificadosService.update(usuarioId, certificadoId, certificado);
  }

  @Delete(':usuarioId/:certificadoId')
  delete(@Param('usuarioId') usuarioId: number, @Param('certificadoId') certificadoId: number) {
    return this.certificadosService.delete(usuarioId, certificadoId);
  }
}

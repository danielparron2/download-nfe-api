import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SoapService } from '../services/soap.service';

@Controller('wsdownload')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  @Post()
  async getData(
    @Body('cnpj') cnpj: string,
    @Body('certBase64') certBase64: any,  // Recebe any para tratar objeto Buffer
    @Body('certPassword') certPassword: string,
    @Body('dtInicio') dtInicio: string,
    @Body('dtTermino') dtTermino: string,
    @Body() fullbody: any
  ) {
    console.log('🟡 Corpo completo recebido do frontend:');
    console.dir(fullbody, { depth: null });

    // Detecta se certBase64 é um objeto Buffer e converte para string Base64
    if (certBase64 && typeof certBase64 !== 'string') {
      if (certBase64.type === 'Buffer' && Array.isArray(certBase64.data)) {
        certBase64 = Buffer.from(certBase64.data).toString('base64');
        console.log('Certificado convertido para Base64:', certBase64.slice(0, 100));
      } else {
        throw new BadRequestException('Formato inválido para certBase64');
      }
    }

    console.log('Dados recebidos no controlador:');
    console.log(`CNPJ: ${cnpj}`);
    console.log(`Certificado Base64: ${certBase64 ? '[FORNECIDO]' : '[NÃO FORNECIDO]'}`);
    console.log(`Senha do Certificado: ${certPassword ? '[FORNECIDO]' : '[NÃO FORNECIDO]'}`);
    console.log(`Data Inicial: ${dtInicio}`);
    console.log(`Data Final: ${dtTermino}`);

    if (!cnpj || !certBase64 || !certPassword || !dtInicio || !dtTermino) {
      throw new BadRequestException('Todos os campos são obrigatórios: cnpj, certBase64, certPassword, dtInicio, dtTermino.');
    }

    return this.soapService.consumeWs(cnpj, certBase64, certPassword, dtInicio, dtTermino);
  }
}

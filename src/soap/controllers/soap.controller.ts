import { Controller, Post, Body } from '@nestjs/common';
import { SoapService } from '../services/soap.service';

@Controller('wsdownload')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  @Post()
  async getData(
    @Body('cnpj') cnpj: string,
    @Body('certBase64') certBase64: string,
    @Body('certPassword') certPassword: string,
    @Body('dtInicio') dtInicio: string,
    @Body('dtTermino') dtTermino: string,
  ) {
    console.log('Dados recebidos no controlador:');
    console.log(`CNPJ: ${cnpj}`);
    console.log(`Certificado Base64: ${certBase64 ? '[FORNECIDO]' : '[NÃO FORNECIDO]'}`);
    console.log(`Senha do Certificado: ${certPassword ? '[FORNECIDO]' : '[NÃO FORNECIDO]'}`);
    console.log(`Data Inicial: ${dtInicio}`);
    console.log(`Data Final: ${dtTermino}`);

    if (!cnpj || !certBase64 || !certPassword || !dtInicio || !dtTermino) {
      throw new Error('Todos os campos são obrigatórios: cnpj, certBase64, certPassword, dtInicio, dtTermino.');
    }

    return this.soapService.consumeWs(cnpj, certBase64, certPassword, dtInicio, dtTermino);
  }
}
